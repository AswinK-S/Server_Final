import { IBooking } from "../../../../../entity/booking";
import { IDoctor } from "../../../../../entity/doctorEntity";
import bookingModel from "../../models/booking"
import doctorModel from "../../models/doctorModel"
import mongoose from "mongoose";

export const getDoctors = async (email: string, bookingModels: typeof bookingModel, doctorModels: typeof doctorModel):Promise<IDoctor[]|void> => {
    try {
        const formattedEmail:string = email.trim().toLowerCase();

        const bookings: IBooking[] = await bookingModels.find({ userEmail: formattedEmail,status:"Pending" }).exec();
        // Log the bookings received

        if (!bookings.length) {
            return;
        }

        const doctorsId: mongoose.Types.ObjectId[] = bookings.map(booking => booking.doctorId);
        const doctors: IDoctor[] = await doctorModels.find({ _id: { $in: doctorsId } }).exec();
        if(doctors){
            doctors.map((item)=>item.password='')
            return doctors;
        }
    } catch (error) {
        throw (error as Error);
    }
}
