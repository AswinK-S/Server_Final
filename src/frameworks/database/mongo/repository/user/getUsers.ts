import { IBooking } from "../../../../../entity/booking"
import { Iuser } from "../../../../../entity/userEntity"
import bookingModel from "../../models/booking"
import userModel from "../../models/userModel"

export const getUsers = async(docId:string,bookingModels:typeof bookingModel,userModels:typeof userModel):Promise<Iuser[]|void>=>{
    try {
        const bookings:IBooking[]= await bookingModels.find({doctorId:docId,status:'Pending'})

        if (!bookings.length) {
            return;
        }
        
        const userEmails:string[] = await  bookings.map((item)=>item.userEmail)
        const users:Iuser[] =await userModels.find({email:{$in:userEmails}})
        return users

    } catch (error) {
        throw (error as Error)
    }
}