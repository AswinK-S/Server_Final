import { ISlot } from "../../../entity/slotEntity";
import { IBookingRepository } from "../../interface/repositoryIntrfce/bookingRepository";

export const cancelBookingFn = async(id:string,bookingRepository:IBookingRepository):Promise<ISlot|void>=>{
    try {
    const result = await bookingRepository.cancelBookingRepo(id)
    return result
    } catch (error) {
        throw (error as Error)
    }
}