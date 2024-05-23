// import { IConversation } from "../../entity/conversation";
import { IConversation } from "../../entity/conversation";
import { IMessage } from "../../entity/messageEntity";
import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { IChatUseCase } from "../interface/IntrfcUseCase/chatUseCase";
import { IChatRepository } from "../interface/repositoryIntrfce/chatRepository";
import ICloudinaryRepository from "../interface/repositoryIntrfce/cloudinaryRepo";
import { IMessageRepository } from "../interface/repositoryIntrfce/messageRepoIntrfc";
import { catchError } from "../middleware/catchError";

import {
    chatFn,
    getChatFn,
    getConversationsFn,
    getMessageFn,
    messageFn,
    saveMsgMediaFn
}
from "./chat/index"

export class ChatUseCase implements IChatUseCase {

    private readonly chatRepository :IChatRepository
    private readonly  messageRepository : IMessageRepository
    private readonly cloudinary:ICloudinaryRepository

    constructor(
        chatRepository:IChatRepository,
        messageRepository:IMessageRepository,
        cloudinary:ICloudinaryRepository
    ){
        this.chatRepository=chatRepository
        this.messageRepository =messageRepository
        this.cloudinary =cloudinary
    }

   async conversationUseCase(senderId:string,receiverId:string,next:Next):Promise<IConversation|void>{
        try{
            const result = await chatFn(senderId,receiverId,this.chatRepository)
            return result

        }catch(error){
            catchError(error as Error,next)
        }
    }

    //get conversation model
    async getConversationUseCase(userId:string,next:Next):Promise<IConversation[]|void>{
        try {
            const result = await getChatFn(userId,this.chatRepository)
            return result
        } catch (error) {
            catchError(error as Error,next)
        }
    }

    // get conversations of two userIds 
    async getconversationsUseCase(firstId:string,secondId:string,next:Next):Promise<IConversation[]|void>{
        try {
            const result =await getConversationsFn(firstId,secondId,this.chatRepository)
            return result
        } catch (error) {
            catchError(error as Error,next)
        }
    }


    //post message
    async messageUseCase(conversationId:string,sender:string,text:string,next:Next):Promise<IMessage|void>{
        try{
            const result = await messageFn(conversationId,sender,text,this.messageRepository)
            return result 
        }catch(error){
            catchError(error as Error,next)
        }
    }

    //save message media
    async messageMediaUseCase(conversationId:string,sender:string,mediaUrl:string,next:Next):Promise<IMessage|void>{
        try {
            const result = await saveMsgMediaFn(conversationId,sender,mediaUrl,this.messageRepository)
            return result
        } catch (error) {
            catchError(error as Error,next)
        }
    }
    //get message from messageModel
    async getMessageUseCase(converSationId:string,next:Next):Promise<IMessage[]|void>{
        try {
            const result = await getMessageFn(converSationId,this.messageRepository)
            return result 
        } catch (error) {
            catchError(error as Error,next)
        }
    }

    //upload media to cloudinary for chat
    async uploadMediaUseCase(media:any,next:Next):Promise<string|void>{
        try {
            const result = await this.cloudinary.saveToCloudinary(media,'ChatMedia')
            return result
        } catch (error) {
           catchError(error as Error,next)
        }
    }


}