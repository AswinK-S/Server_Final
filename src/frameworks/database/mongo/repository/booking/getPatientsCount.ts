import { overview } from "../../../../../entity/overView";
import bookingModel from "../../models/booking";

export const  getPatientsCount =async(id:string,bookingModels:typeof bookingModel):Promise<overview|void>=>{
    try {

        const totalPatients = await bookingModels.find({doctorId:id}).countDocuments()
        const cancelled = await bookingModels.find({doctorId:id,status:'Cancelled'}).countDocuments()
        const pending = await bookingModels.find({doctorId:id,status:'Pending'}).countDocuments()
        const consulted = await bookingModels.find({doctorId:id,status:'Consulted'}).countDocuments()

        return{
            total : totalPatients ,
            cancelled : cancelled,
            pending : pending,
            consulted : consulted  
        }
    } catch (error) {
        throw(error as Error)
    }
}