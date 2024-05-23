import { IMessage } from "../../../entity/messageEntity"
import { IMessageRepository } from "../../interface/repositoryIntrfce/messageRepoIntrfc"

export const saveMsgMediaFn = async(conversationId:string,sender:string,mediaUrl:string,messageRepository:IMessageRepository):Promise<IMessage|void>=>{
    try {
        const result = await messageRepository.saveMessageMediaMsgRepo(conversationId,sender,mediaUrl)
        return result 
    } catch (error) {
        throw(error as Error)
    }
}