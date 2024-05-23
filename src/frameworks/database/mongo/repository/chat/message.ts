import { IMessage } from "../../../../../entity/messageEntity"
import messageModel from "../../models/Message"

export const message =async(conversationId:string,sender:string,text:string,messageModels:typeof messageModel):Promise<IMessage|void>=>{
    try {
        const messages:IMessage ={converSationId:conversationId,sender:sender,text:text}
        const result = await messageModels.create(messages)
        
        return result
    } catch (error) {
        throw (error as Error)
    }
}