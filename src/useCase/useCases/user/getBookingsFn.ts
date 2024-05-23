import { ITransformedBooking } from "../../../entity/transformedBooking"
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc"

export const getBookingFn = async(page:number,email:string,pageSize:number,userRepository:IUserRepository):Promise<ITransformedBooking[]|void>=>{
    try {
        const result = await userRepository.getBookingDetailsRepo(page,email,pageSize)
        return result
    } catch (error) {
       throw(error as Error) 
    }
}