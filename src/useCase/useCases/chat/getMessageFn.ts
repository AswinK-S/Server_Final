import { IMessage } from "../../../entity/messageEntity"
import { IMessageRepository } from "../../interface/repositoryIntrfce/messageRepoIntrfc"

export const getMessageFn = async(conversationId:string,messageRepository:IMessageRepository):Promise<IMessage[]|void>=>{
    try {
        const result = await messageRepository.getMessgeRepo(conversationId)
        return result
    } catch (error) {
        throw (error as Error)
    }
}