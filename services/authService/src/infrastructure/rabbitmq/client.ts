import { Channel, Connection, connect } from 'amqplib'
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

            const { queue: queue } = await this.consumerChannel.assertQueue(config.rabbitMq.queues.authQueue, { exclusive: true });
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

export default RabbitMQClient.getInstance()