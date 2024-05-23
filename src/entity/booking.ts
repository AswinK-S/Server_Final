import mongoose from "mongoose"

export interface IBooking {
    treatmentId:mongoose.Types.ObjectId,
    subTreatmentId:string,
    doctorId:mongoose.Types.ObjectId,
    userEmail:string,
    amount:number,
    status:string,
    consultingDate: Date,
    chargeId:string,
    timeStamps:Boolean
}