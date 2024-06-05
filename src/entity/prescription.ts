import mongoose from "mongoose";

export interface Iprescription {
    date:Date,
    doctorId:mongoose.Types.ObjectId,
    userEmail:String,
    notes:String,
}