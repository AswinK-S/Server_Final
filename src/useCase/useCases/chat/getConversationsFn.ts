import { IConversation } from "../../../entity/conversation";
import { IChatRepository } from "../../interface/repositoryIntrfce/chatRepository";

export const getConversationsFn = async(firstId:string,secondId:string,chatRepository:IChatRepository):Promise<IConversation[]|void>=>{
    try {
        const result = await chatRepository.getConversationsRepo(firstId,secondId)
        return  result;
    } catch (error) {
        throw(error as Error)
    }
}