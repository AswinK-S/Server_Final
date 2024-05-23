import { IMessage } from "../../../entity/messageEntity";

export interface IMessageRepository {
    postMessageRepo(conversationId:string,sender:string,text:string):Promise<IMessage|void>
    getMessgeRepo(conversationId:string):Promise<IMessage[]|void>
    saveMessageMediaMsgRepo(conversationId:string,sender:string,mediaUrl:string):Promise<IMessage|void>
}