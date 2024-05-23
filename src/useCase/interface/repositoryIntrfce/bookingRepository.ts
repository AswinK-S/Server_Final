import { IBooking } from "../../../entity/booking";
import { overview } from "../../../entity/overView";
import { ISlot } from "../../../entity/slotEntity";
import { Req } from "../../../frameworks/types/serverPackageTypes";

export interface IBookingRepository{
    
    createBookingRepo(amount: number, email: string, doctorId:string,treatmentId:string,subTreatmentId:string,consultingDate:Date,chargeId:string):Promise<IBooking|void>
    //cancel booking 
    cancelBookingRepo(id:string):Promise<ISlot|void>
    getBookingForCancelRepo(id:string):Promise<any>
    //get patients count
    getOverviewRepo(id:string):Promise<overview|void>

    //get bookings data for admin
    getBookingsDataRepo(req:Req):Promise<object>
    //confirm consultation
    consultationConfirmationRepo(docId:string,email:string):Promise<IBooking|void>
}