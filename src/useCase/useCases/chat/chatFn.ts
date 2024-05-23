import { IConversation } from "../../../entity/conversation"
import { IChatRepository } from "../../interface/repositoryIntrfce/chatRepository"

export const chatFn = async(senderId:string,receiverId:string,chatRepository:IChatRepository):Promise<IConversation|void>=>{
    try {
        const result = await chatRepository.conversationRepo(senderId,receiverId)
        return result
    } catch (error) {
       throw (error as Error) 
    }
}