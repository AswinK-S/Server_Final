import { IConversation } from "../../../entity/conversation";
import { IMessage } from "../../../entity/messageEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface IChatUseCase{

    conversationUseCase(senderId:string,receiverId:string,next:Next):Promise<IConversation|void>
    // get conversation list from conversationModel 
    getConversationUseCase(userId:string,next:Next):Promise<IConversation[]|void>
    //post message
    messageUseCase(conversationId:string,sender:string,text:string,next:Next):Promise<IMessage|void>
    //get message from database
    getMessageUseCase(converSationId:string,next:Next):Promise<IMessage[]|void>
    //get conversations of two userIds
    getconversationsUseCase(firstId:string,secondId:string,next:Next):Promise<IConversation[]|void>
    //upload chat media to cloudinary
    uploadMediaUseCase(media:any,next:Next):Promise<string|void>
    //save message media
    messageMediaUseCase(conversationId:string,sender:string,mediaUrl:string,next:Next):Promise<IMessage|void>
}