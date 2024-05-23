import { IPatients } from "../../../../../entity/patientsForDoc";
import bookingModel from "../../models/booking"
import userModel from "../../models/userModel";

export const getPatients = async (id: string, limit: number, page: number, bookingModels: typeof bookingModel, userModels: typeof userModel): Promise<IPatients[] | void> => {
    try {
        const skip = (page - 1) * limit
        const bookings = await bookingModels
            .find({ doctorId: id })
            .skip(skip)
            .limit(limit)
            .populate("treatmentId", "name subTreatments") // Populate treatment name and sub-treatments
            .select("doctorId userEmail treatmentId subTreatmentId amount status consultingDate createdAt ")
            .lean();

        const userEmails = bookings.map((booking: any) => booking.userEmail)
        const users = await userModels.find({ email: { $in: userEmails } }).lean()

        // transforms the booking data to get treatment name, subTrtmnt name, status , consulting date 
        const transformedBookings = bookings.map((booking: any) => {
            
            const treatmentName = booking.treatmentId?.name || 'unknown Doctor'
            const bookingId = booking._id
            const email = booking.userEmail
            const status = booking.status
            const subTrtmntName = booking.treatmentId?.subTreatments.find(
                (subTreatment: any) => subTreatment._id.toString() === booking.subTreatmentId
            )?.name || 'unknown sub treatment'

            const user = users.find((user: any) => user.email === email)
            const userName = user ? user.name : 'unknown'
            const consultingDate = booking.consultingDate

            const formatedDate = consultingDate?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });


            return {
                treatmentName,
                subTrtmntName,
                bookingId,
                email,
                userName,
                status,
                consultingDate:formatedDate
            }
        })

        return transformedBookings

    } catch (error) {
        throw (error as Error)
    }
}