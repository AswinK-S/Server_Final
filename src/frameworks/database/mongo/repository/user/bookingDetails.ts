import { IBookingDetail } from "../../../../../entity/bookingDtl";
import doctorModel from "../../models/doctorModel";
import treatmentModel from "../../models/treatmentModel";

export const bookingDtlRepo = async (trtmntId:string,sbTrtmntId:string,docId:string,treatmentModels: typeof treatmentModel,doctorModels: typeof doctorModel):Promise<Partial<IBookingDetail>|void>=>{
    try {
        let bookingDetails: Partial<IBookingDetail>={}
        const doctor: any = await doctorModels.findOne({_id:docId});
        if(doctor){
             
            bookingDetails = {
                ...bookingDetails,
                doctorName: doctor.name,
                doctorId: doctor._id,
                amount:doctor.amount
              };

        }
        const treatment:any = await treatmentModels.findOne({_id:trtmntId})
        if(treatment){
            const treatmentName = treatment?.name
           bookingDetails={...bookingDetails,treatmentName:treatment?.name,treatmentId:treatment?._id}  ;

           const subTreatmentName= treatment?.subTreatments

           // Filter the sbTrtmnts array to find the object with the specific _id
           const subTreatment = treatment?.subTreatments.find((trtmnt: any) => trtmnt._id.equals(sbTrtmntId));
           bookingDetails={...bookingDetails,subTreatmentName:subTreatment.name, subTreatmentId:subTreatment._id }
            return bookingDetails
        }


    } catch (error) {
        throw (error as Error)
    }
} 