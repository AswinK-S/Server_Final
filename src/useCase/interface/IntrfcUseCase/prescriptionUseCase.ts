export interface IPrescriptionUseCase{
    addPrescriptionUseCase(prescription:string,docId:string,bookingId:string,userEmail:string):Promise<void|{message:string}>
    getPrescriptionUseCase(doctorName:string, treatmentName:string, subTreatmentName:string,
        consultationDate:string, userName:string,prescriptionId:string ):Promise<any>
}