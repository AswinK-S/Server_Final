import { IBooking } from "../../../../../entity/booking";
import bookingModel from "../../models/booking";

export const confirmConsultation = async (docId: string, bookingId: string, bookingModels: typeof bookingModel): Promise<IBooking | void> => {
  try {
    // Find the booking document
    const booking = await bookingModels.findOne({ doctorId: docId, _id: bookingId });
    if (!booking) {
      throw new Error("Booking not found");
    }

    // Determine the new status based on the current status
    let newStatus = "";
    if (booking.status === "Pending") {
      newStatus = "Consulted";
    } else if (booking.status === "Consulted") {
      newStatus = "Pending";
    } else {
      throw new Error("Invalid status");
    }

    // Update the booking status
    const result = await bookingModels.findOneAndUpdate(
      { doctorId: docId, _id: bookingId },
      { $set: { status: newStatus } },
      { new: true }
    );

    if (result) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};
