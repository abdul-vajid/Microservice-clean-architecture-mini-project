import eventHanlder from "../../handlers/services/index";
import { depentencies } from '../../utils/';
import rabbitMQClient from "./client"


export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string,
    ) {
        const { saveUserData } = eventHanlder(depentencies)
        let response = {}
        switch (operation) {
            case "registerUser":
                response = await saveUserData(data)
                console.log(">> >> Debug log 1: response in messagehandler",response);
                break;
            default:
                response = "Request-key notfound"
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}
