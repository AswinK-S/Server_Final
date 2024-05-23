import { IConversation } from "../../../../../entity/conversation";
import conversationModel from "../../models/Conversation";

export const getConversations = async(firstId:string,secondId:string,conversationModels:typeof conversationModel):Promise<IConversation[]|void>=>{
    try {
        const result = await conversationModels.find({members:{$all:[firstId,secondId]}})
        return result
    } catch (error) {
        throw (error as Error)
    }
}