import { IConversation } from "../../../entity/conversation";
import { IChatRepository } from "../../interface/repositoryIntrfce/chatRepository";

export const getChatFn = async(userId:string,chatRepository:IChatRepository):Promise<IConversation[]|void>=>{
    try {
        const result = await chatRepository.getConversationRepo(userId)
        return  result;
    } catch (error) {
        throw(error as Error)
    }
}