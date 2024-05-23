import { IMessage } from "../../../../../entity/messageEntity";
import messageModel from "../../models/Message";

export const getMessage = async(conversationId:string,messageModels:typeof messageModel):Promise<IMessage[]|void>=>{
    try {
        
     const result =await messageModels.find({converSationId:conversationId})   
     return result
    } catch (error) {
      throw (error as Error)  
    }
}