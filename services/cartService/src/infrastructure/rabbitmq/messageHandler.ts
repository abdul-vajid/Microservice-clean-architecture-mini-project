import rabbitMQClient from ./client

export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string
    ) {
        let response = {}
        console.log(the operation is, operation);
        switch (operation) {
            case getCartDetails:
                response = 
                break;
            default:
                response = Request-key notfound
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}
