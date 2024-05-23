import { ISlot } from "../../../../../entity/slotEntity";
import bookingModel from "../../models/booking"
import slotModel from "../../models/slot"

export const cancelBooking = async (chargeId: string, bookingModels: typeof bookingModel, slotModels: typeof slotModel): Promise<ISlot | void> => {
    try {
        const bookingResult = await bookingModels.findOneAndUpdate({ chargeId }, { $set: { status: 'Cancelled' } },{new:true})

        if (bookingResult) {
            const doctorIdString = bookingResult?.doctorId.toString();
            const date = bookingResult?.consultingDate
            const slotResult = await slotModels.findOneAndUpdate({doctorId:doctorIdString ,date:date}, { $inc: { count: 1 } }, { new: true })
            if(slotResult)return slotResult
        }

    } catch (error) {
        throw (error as Error)
    }
}