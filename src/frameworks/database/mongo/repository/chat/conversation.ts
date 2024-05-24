import { IConversation } from "../../../../../entity/conversation";
import conversationModel from "../../models/Conversation";

export const conversation = async(senderId:string,receiverId:string,conversationModels:typeof conversationModel):Promise<IConversation|void>=>{
    try {
        console.log('senderId:',senderId,'rId--',receiverId,);
        if(senderId && receiverId){
            console.log('sndr Id-',senderId);
            const  members:[String,String] =[senderId,receiverId]
            const result = await conversationModels.create({members});
            return result 
        }
       
    } catch (error) {
        throw (error as Error)
    }
}