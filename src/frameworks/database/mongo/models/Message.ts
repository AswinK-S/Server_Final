import mongoose, { Model, Schema } from "mongoose"
import { IMessage } from "../../../../entity/messageEntity"

const messageSchema: Schema<IMessage> = new mongoose.Schema({
    converSationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    },
    media:{
        type:String
    },
    timeStamps: {
        type: Boolean,
        default: true
      }
},{ timestamps: true })

const messageModel: Model<IMessage> = mongoose.model('Message', messageSchema)

export default messageModel