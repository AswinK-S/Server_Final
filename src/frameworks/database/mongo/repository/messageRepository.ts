import { IMessage } from "../../../../entity/messageEntity";
import messageModel from "../models/Message";

import {
    message,
    getMessage,
    saveMediaMsg

} from './chat/index'

export class MessageRepository{

    constructor(private messageModels:typeof messageModel){}

    async postMessageRepo(conversationId:string,sender:string,text:string):Promise<IMessage|void>{
        try{
            const result = await message(conversationId,sender,text,this.messageModels)
            return result
        }catch(error){
            throw (error as Error)
        }
    }

    //get message from messageModel
   async getMessgeRepo(conversationId:string):Promise<IMessage[]|void>{
    try{
        const result = await getMessage(conversationId,this.messageModels)
        return result
    }catch(error){
        throw(error as Error)
    }
   }

   //save chat media
   async saveMessageMediaMsgRepo(conversationId:string,sender:string,mediaUrl:string):Promise<IMessage|void>{
    try {
        const result = await saveMediaMsg(conversationId,sender,mediaUrl,this.messageModels)
        return result
    } catch (error) {
        throw (error as Error)
    }
   }
}