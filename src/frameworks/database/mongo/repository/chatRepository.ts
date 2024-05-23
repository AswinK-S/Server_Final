
import { IConversation } from '../../../../entity/conversation'
import conversationModel from '../models/Conversation'

import{
    conversation,
    getConversation,
    getConversations,
}
from './chat/index'


export class ChatRepository {
    constructor(private conversationModels:typeof conversationModel){}
    

    async conversationRepo(senderId:string,receiverId:string):Promise<IConversation|void>{
        try {
            const result = await conversation(senderId,receiverId,this.conversationModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    //get conversation details from conversationModels
    async getConversationRepo(userId:string):Promise<IConversation[]|void>{
        try {
            const result = await getConversation(userId,this.conversationModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    //get conversations of two userIds
    async getConversationsRepo(firstId:string,secondId:string):Promise<IConversation[]|void>{
        try {
            const result = await getConversations(firstId,secondId,this.conversationModels)
            return result
        } catch (error) {
            throw(error as Error)
        }
    }
}