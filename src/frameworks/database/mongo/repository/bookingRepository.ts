import { IBooking } from "../../../../entity/booking";
import { overview } from "../../../../entity/overView";
import { ISlot } from "../../../../entity/slotEntity";
import { IBookingRepository } from "../../../../useCase/interface/repositoryIntrfce/bookingRepository";
import { Req } from "../../../types/serverPackageTypes";
import bookingModel from "../models/booking";
import slotModel from "../models/slot";

import {
    createBooking,
    getBookingForCancel,
    cancelBooking,
    getPatientsCount,
    getBookingsData,
    confirmConsultation
}from './booking/index'

export class BookingRepository implements IBookingRepository{
    
constructor(
    private bookingModels:typeof bookingModel,
    private slotModels:typeof slotModel,
){}

// create booking
async createBookingRepo(amount: number, email: string, doctorId:string,treatmentId:string,subTreatmentId:string,date:Date,chargeId:string):Promise<IBooking|void>{
    try {
        const result = await createBooking(amount, email, doctorId,treatmentId,subTreatmentId,date,chargeId,this.bookingModels,this.slotModels)
        return result
    } catch (error) {
        throw (error as Error)
    }
}

// cancel booking after refund 
async cancelBookingRepo(id:string):Promise<ISlot|void>{
    try {
        const result = await cancelBooking(id,this.bookingModels,this.slotModels)
        return result
    } catch (error) {
        throw(error as Error)
    }
}

//cancel booking
async getBookingForCancelRepo(id:string):Promise<any>{
    try {
        const result = await getBookingForCancel(id,this.bookingModels,this.slotModels)
        return result
    } catch (error) {
       throw (error as Error) 
    }
}

//get patients counst for overview
async getOverviewRepo(id:string):Promise<overview|void>{
    try {
        const result = await getPatientsCount(id,this.bookingModels)
        return result
    } catch (error) {
        throw (error as Error)
    }
}

//get booking data for admin
async getBookingsDataRepo(req:Req):Promise<object>{
    try {
        const result = await getBookingsData(this.bookingModels)
        return result
    } catch (error) {
        throw(error as Error)
    }
}

//consultation confirmation
async consultationConfirmationRepo(docId:string,bookingId:string):Promise<IBooking|void>{
    try {
        const result = await confirmConsultation(docId,bookingId,this.bookingModels)
        return result
    } catch (error) {
        throw (error as Error)
    }
}

}