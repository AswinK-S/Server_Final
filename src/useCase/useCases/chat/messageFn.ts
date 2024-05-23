import { IMessage } from "../../../entity/messageEntity"
import { IMessageRepository } from "../../interface/repositoryIntrfce/messageRepoIntrfc"


export const messageFn = async(conversationId:string,sender:string,text:string,messageRepository:IMessageRepository):Promise<IMessage|void>=>{
    try {
        const  result = await messageRepository.postMessageRepo(conversationId,sender,text)
        return result
    } catch (error) {
        throw (error as Error)
    }
}