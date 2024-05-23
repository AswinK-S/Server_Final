import { IConversation } from "../../../entity/conversation";

export interface IChatRepository {
    conversationRepo(senderId:string,receiverId:string):Promise<IConversation|void>
    getConversationRepo(userId:string):Promise<IConversation[]|void>
    getConversationsRepo(firstId:string,secondId:string):Promise<IConversation[]|void>
}