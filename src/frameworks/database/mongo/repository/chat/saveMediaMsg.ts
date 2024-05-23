import { IMessage } from "../../../../../entity/messageEntity"
import messageModel from "../../models/Message"

export const saveMediaMsg = async(conversationId:string,sender:string,mediaUrl:string,messageModels:typeof messageModel):Promise<IMessage | void> => {
    try {
        const result = await messageModels.create({
            converSationId:conversationId,
            sender:sender,
            media:mediaUrl

        })
        return result
    } catch (error) {
        throw (error as Error)
    }
}