import { IBooking } from "../../../../entity/booking";
import mongoose, { Model, Schema } from "mongoose";

const bookingSchema: Schema<IBooking> = new mongoose.Schema({
    treatmentId:{
        type :mongoose.Schema.Types.ObjectId,
        ref :'Treatment',
        required : true
    },
    subTreatmentId:{
        type:String,
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    },
    consultingDate:{
        type:Date,
        required:true
    },
    chargeId:{
        type:String,
        required:true
    },
    prescriptions:{
        type:mongoose.Schema.Types.ObjectId,
            ref:'Prescription'
    },
    timeStamps:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

const bookingModel:Model<IBooking> = mongoose.model('Booking',bookingSchema)
export default bookingModel