import { IConversation } from "../../../../../entity/conversation";
import conversationModel from "../../models/Conversation";

export const getConversation = async(userId:string,conversationModels:typeof conversationModel):Promise<IConversation[]|void>=>{
    try {
        const result = await conversationModels.find({members:{$in:[userId]}})
        return result
    } catch (error) {
        throw (error as Error)
    }
}