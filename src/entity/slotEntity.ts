import mongoose from "mongoose";
// import doctorModel from "../frameworks/database/mongo/models/doctorModel";

export interface ISlot{
    _id?:string,
    doctorId: mongoose.Types.ObjectId ,
    date:Date,
    shift:string,
    status?:Boolean,
    count:number,
    timePart?:string,
    
}