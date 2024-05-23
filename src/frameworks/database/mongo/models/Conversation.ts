import mongoose, { Model, Schema } from "mongoose"
import { IConversation } from "../../../../entity/conversation"

const conversationSchema: Schema<IConversation> = new mongoose.Schema({
  members: Array,
  timeStamps: {
    type: Boolean,
    default: true
  }
},{ timestamps: true })

const conversationModel: Model<IConversation> = mongoose.model('Conversation', conversationSchema)

export default conversationModel