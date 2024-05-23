import bookingModel from "../../models/booking";
import slotModel from "../../models/slot";

export const getBookingForCancel = async(id:string,bookingModels:typeof bookingModel,slotModels:typeof slotModel):Promise<any>=>{
    try {
        const result = await bookingModels.findById({_id:id})
        return result
    } catch (error) {
        
    }
}