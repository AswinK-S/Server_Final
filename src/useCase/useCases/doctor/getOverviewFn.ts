import { overview } from "../../../entity/overView";
import { IBookingRepository } from "../../interface/repositoryIntrfce/bookingRepository";

export const getOverviewFn = async(id:string,bookingRepository:IBookingRepository):Promise<overview|void>=>{
    try {
        const result = await bookingRepository.getOverviewRepo(id)
        return result
    } catch (error) {
       throw (error as Error) 
    }
}