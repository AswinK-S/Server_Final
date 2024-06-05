import { Model } from "mongoose";
import { IBooking } from "../../../../../entity/booking";
import { IDoctor } from "../../../../../entity/doctorEntity";
import { ITreatment } from "../../../../../entity/treatmentEntity";
import { ITransformedBooking } from "../../../../../entity/transformedBooking";

export const bookings = async (
  page: number,
  email: string,
  pageSize:number,
  bookingModel: Model<IBooking>,
  doctorModel: Model<IDoctor>,
  treatmentModel: Model<ITreatment>
):Promise<ITransformedBooking[]|void> => {
  try {
    const skip = (page - 1) * pageSize;

    // Fetch bookings for the given email and paginate the results
    const bookings = await bookingModel
      .find({ userEmail: email })
      .skip(skip)
      .limit(pageSize)
      .populate("doctorId", "name") // Populate doctor name
      .populate("treatmentId", "name subTreatments") // Populate treatment name and sub-treatments
      .select("doctorId treatmentId subTreatmentId amount status consultingDate createdAt chargeId prescriptions")
      .lean()
      .sort({ createdAt: -1 });

    // Transform the bookings data to include doctor name, treatment name, and sub-treatment name
    const transformedBookings = bookings.map((booking: any) => {
      const id=booking?._id
      const   chargeId=booking?.chargeId
      const doctorName = booking.doctorId?.name || "Unknown Doctor";
      const treatmentName = booking.treatmentId?.name || "Unknown Treatment";
      const subTreatmentName =
        booking.treatmentId?.subTreatments.find(
          (subTreatment: any) => subTreatment._id.toString() === booking.subTreatmentId
        )?.name || "Unknown Sub-Treatment";
       const prescription=booking?.prescriptions ||'no prescription'

      return {
        id,
        chargeId,
        doctorName,
        treatmentName,
        subTreatmentName,
        amount: booking?.amount,
        bookedDate:booking?.createdAT,
        consultationDate:booking?.consultingDate,
        status:booking?.status,
        bookingDate:booking?.createdAt,
        prescription
      };
    });

    return transformedBookings;
  } catch (error) {
    throw error;
  }
};
