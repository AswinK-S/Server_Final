import { Iprescription } from "../../../entity/prescription"

export interface IPrescriptionUseCase{
    addPrescriptionUseCase(prescription:string,docId:string,bookingId:string,userEmail:string):Promise<void|{message:string}>
    getPrescriptionUseCase(prescriptionId:string ):Promise<any>
}