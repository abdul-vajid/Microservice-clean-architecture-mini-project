import { Channel, ConsumeMessage } from "amqplib";
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
                        console.log("Some properties are missing..");
                    } else {
                        await MessageHandler.handle(operation, JSON.parse(message.content.toString()), correlationId, replyTo)
                    }
                }, {
                noAck: true
            })
        }
    }
}
