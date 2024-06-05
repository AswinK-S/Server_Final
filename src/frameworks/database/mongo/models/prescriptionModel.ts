import mongoose,{Schema,Model} from 'mongoose'
import { Iprescription } from '../../../../entity/prescription'

const prescriptionSchema: Schema<Iprescription> = new mongoose.Schema({
    date:{
        type:Date
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
    },
    userEmail:{
        type:String
    },

    notes:{
        type:String
    }

})

const prescriptionModel:Model<Iprescription> = mongoose.model('Prescription',prescriptionSchema)
export default prescriptionModel