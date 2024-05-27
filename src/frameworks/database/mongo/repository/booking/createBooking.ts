import { IBooking } from "../../../../../entity/booking";
import { Req } from "../../../../types/serverPackageTypes";
import bookingModel from "../../models/booking"
import slotModel from "../../models/slot";
import userModel from "../../models/userModel";

export const createBooking = async (amount: number, email: string, doctorId: string, treatmentId: string, subTreatmentId: string, date:Date,chargeId:string,bookingModels: typeof bookingModel, slotModels: typeof slotModel): Promise<IBooking | void> => {
    try {
       
            const result = await bookingModels.create({ amount: amount, userEmail: email, doctorId: doctorId, treatmentId: treatmentId, subTreatmentId: subTreatmentId,consultingDate:date,chargeId:chargeId })
            if (result) {
                 await slotModels.findOneAndUpdate({ doctorId: doctorId,date }, { $inc: { count: -1 } }, { new: true })
            }
            return result
       
    } catch (error) {
        throw (error as Error)
    }
}