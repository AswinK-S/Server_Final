import { IConversation } from "../../../../../entity/conversation";
import conversationModel from "../../models/Conversation";

export const conversation = async (
    senderId: string,
    receiverId: string,
    conversationModels: typeof conversationModel
): Promise<IConversation | void> => {
    try {
        if (senderId && receiverId) {
            // Find all existing conversations
            const isExist = await conversationModels.find();

            // Create an array with the senderId and receiverId
            const members: [String, String] = [senderId, receiverId];

            // Check if a conversation with the given members already exists
            const existingConversation = isExist.find(
                (conv: any) =>
                    conv.members.includes(senderId) && conv.members.includes(receiverId)
            );

            // If a conversation exists, return it
            if (existingConversation) {
                return existingConversation;
            }

            // If no existing conversation is found, create a new one
            const result = await conversationModels.create({ members });
            return result;
        }
    } catch (error) {
        throw error as Error;
    }
};