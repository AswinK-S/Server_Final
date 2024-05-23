import { IBooking } from "../../../entity/booking"
import { IBookingRepository } from "../../interface/repositoryIntrfce/bookingRepository"

export const confirmConsultationFn = async(docId:string,bookingId:string,bookingRepository:IBookingRepository):Promise<IBooking|void>=>{
    try {
        const result = await bookingRepository.consultationConfirmationRepo(docId,bookingId)
        return result
    } catch (error) {
        throw(error as Error)
    }
}