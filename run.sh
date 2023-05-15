#!/bin/bash

set -e
set -v

mkdir services/orderService

cd services/orderService

yarn init -y

mkdir src/
mkdir -p src/adapters/
mkdir -p src/adapters/databases/
mkdir -p src/adapters/database/mongoose/
mkdir -p src/adapters/database/mongoose/repositories/
mkdir -p src/adapters/database/mongoose/schemas/
mkdir -p src/adapters/middlewares/
mkdir -p src/adapters/routes/
mkdir -p src/controllers/
mkdir -p src/entities/
mkdir -p src/infrastructure/
mkdir -p src/infrastructure/mongodb/
mkdir -p src/infrastructure/rabbitmq/
mkdir -p src/usecases/
mkdir -p src/utils/
mkdir -p src/utils/config/
mkdir -p src/utils/errors/
mkdir -p src/utils/interfaces/
mkdir -p src/utils/validations/

touch .env
touch src/main.ts
touch src/adapters/database/mongoose/index.ts
touch src/adapters/routes/index.ts
touch src/controllers/index.ts


touch tsconfig.json

echo '{
"compilerOptions": {
"module": "NodeNext",
"target": "es2020",
"outDir": "build",
"sourceMap": true,
"allowJs": true,
"noEmit": true,
"allowImportingTsExtensions": true,
"moduleResolution": "nodenext",
"noImplicitAny": true,
"strict": false,
"esModuleInterop": true,
"skipLibCheck": true
},
"include": ["src/**/*"]
}' > tsconfig.json

touch Dockerfile

echo 'FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "dev" ]
' > Dockerfile


touch src/infrastructure/mongodb/driverConnection.ts

echo 'import mongoose from "mongoose";

export class MongooseConnection {
  public static uri: string;

  constructor(uri: string) {
    MongooseConnection.uri = uri;
  }

  connectMongoDB() {
    mongoose.set("strictQuery", false);

    mongoose.connect(MongooseConnection.uri)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log(`Database connection failed: ${error}`);
      });
  }
}' >  src/infrastructure/mongodb/driverConnection.ts

touch src/infrastructure/mongodb/dbConnection.ts

echo 'import { MongooseConnection } from './driverConnection.ts';

class MongoDbConnection extends MongooseConnection {
    private static instance: MongoDbConnection;
    constructor() {
        const uri: string = process.env.MONGO_URI ;
        super(uri as string);
    }

    public static getDbInstance() {
        if (!this.instance) {
            this.instance = new MongoDbConnection();
            this.instance.connectMongoDB();
        }

        return this.instance;
    }
}

export default MongoDbConnection.getDbInstance();' > src/infrastructure/mongodb/dbConnection.ts



touch src/infrastructure/rabbitmq/rabbitmq.config.ts

echo 'export default {
    rabbitMq: {
        url: 'amqp://admin:password@rabbitmq:5672/',
        queues: {
            userQueue: 'user_queue',
            cartQueue: 'cart_queue',
            productQueue: 'product_queue',
            orderQueue: 'order_queue',
        }
    }
}' > src/infrastructure/rabbitmq/rabbitmq.config.ts

touch src/infrastructure/rabbitmq/client.ts

echo 'import { Channel, Connection, connect } from 'amqplib'
import config from './rabbitmq.config'
import Consumer from './consumer';
import Producer from './producer';
import { EventEmitter } from 'events';

class RabbitMQClient {

    private constructor() { };

    private static instance: RabbitMQClient;
    private isInitialized: boolean = false;
    private producer: Producer;
    private consumer: Consumer;
    private connection: Connection;
    private producerChannel: Channel;
    private consumerChannel: Channel;
    private eventEmitter: EventEmitter

    public static getInstance() {
        if (!this.instance) {
            this.instance = new RabbitMQClient();
        }
        return this.instance;
    }

    async initialize() {
        if (this.isInitialized) {
            return;
        }
        try {
            this.connection = await connect(config.rabbitMq.url);
            this.eventEmitter = new EventEmitter();

            this.producerChannel = await this.connection.createChannel();
            this.consumerChannel = await this.connection.createChannel();

            const { queue: queue } = await this.consumerChannel.assertQueue(config.rabbitMq.queues.cartQueue, { exclusive: true });
            const { queue: replyQueueName } = await this.consumerChannel.assertQueue('', { exclusive: true });

            this.producer = new Producer(this.producerChannel, replyQueueName, this.eventEmitter);
            this.consumer = new Consumer(this.consumerChannel);
            this.consumer.consumeMessages(queue);
            this.consumer.consumeMessages(replyQueueName, this.eventEmitter);
            this.isInitialized = true;
        } catch (error) {
            console.error('** rabbitmq error...', error)
        }
    }

    async Requester(data: any, targetQueue: string, operation: string) {
        if (!this.isInitialized) {
            await this.initialize()
        }
        return await this.producer.requestingProducer(data, targetQueue, operation);
    }

    async Responder(data: any, correlationId: string, replyToQueue: string) {
        if (!this.isInitialized) {
            await this.initialize()
        }
        return await this.producer.respondingProducer(data, correlationId, replyToQueue);
    }
}

export default RabbitMQClient.getInstance()' > src/infrastructure/rabbitmq/client.ts

touch src/infrastructure/rabbitmq/consumer.ts

echo 'import { Channel, ConsumeMessage } from "amqplib";
import { EventEmitter } from "events";
import MessageHandler from "./messageHandler";

export default class Consumer {
    constructor(private channel: Channel) { }

    async consumeMessages(queue: string, eventEmitter?: EventEmitter) {
        if (eventEmitter) {
            this.channel.consume(queue, (message: ConsumeMessage) => {
                console.log(JSON.parse(message.content.toString()), message.properties.correlationId.toString());
                eventEmitter.emit(message.properties.correlationId.toString(), message);
            }, {
                noAck: true
            })
        } else {
            this.channel.consume(queue,
                async (message: ConsumeMessage) => {
                    const { correlationId, replyTo } = message.properties
                    const operation = message.properties.headers.function
                    if (!correlationId || !replyTo) {
                        console.log('Some properties are missing..');
                    } else {
                        await MessageHandler.handle(operation, JSON.parse(message.content.toString()), correlationId, replyTo)
                    }
                }, {
                noAck: true
            })
        }
    }
}' > src/infrastructure/rabbitmq/consumer.ts

touch src/infrastructure/rabbitmq/producer.ts

echo 'import { Channel } from "amqplib";
import { randomUUID } from "crypto";
import { EventEmitter } from "events";

export default class Producer {
    constructor(private channel: Channel, private replyQueueName: string, private eventEmitter: EventEmitter) { }

    async requestingProducer(data: any, targetQueue: string, operation: string) {
        try {
            const uuid = randomUUID()
            const isSuccess = this.channel.sendToQueue(
                targetQueue,
                Buffer.from(JSON.stringify(data)),
                {
                    replyTo: this.replyQueueName,
                    correlationId: uuid,
                    headers: {
                        function: operation
                    }
                }
            )
            return new Promise((resolve, rejects) => {
                this.eventEmitter.once(uuid, (data) => {
                    const reply: any = JSON.parse(data.content.toString());
                    resolve(reply)
                })
            })
        } catch (err) {
            throw new Error("Error inside Auth producer")
        }
    }

    async respondingProducer(data: any, correlationId: string, replyToQueue: string) {
        this.channel.sendToQueue(
            replyToQueue,
            Buffer.from(JSON.stringify(data)),
            {
                correlationId: correlationId
            }
        )
    }
}' > src/infrastructure/rabbitmq/producer.ts

touch src/infrastructure/rabbitmq/messageHandler.ts

echo 'import rabbitMQClient from './client'

export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string
    ) {
        let response = {}
        console.log('the operation is', operation);
        switch (operation) {
            case 'getCartDetails':
                response = ''
                break;
            default:
                response = 'Request-key notfound'
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}' > src/infrastructure/rabbitmq/messageHandler.ts

yarn add amqplib body-parser cookie-parser cors crypto dotenv express joi jsonwebtoken mongoose morgan

yarn add -D @types/amqplib @types/cookie-parser @types/cors @types/dotenv @types/express @types/joi @types/jsonwebtoken @types/morgan  @types/node nodemon ts-node typescript
