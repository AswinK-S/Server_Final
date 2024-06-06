
export interface IPrescriptionRepository{
    addPrescriptionRepo(prescription:string,docId:string,bookingId:string,userEmail:string):Promise<void|{message:string}>
    getPrescriptionRepo(prescriptionId:string):Promise<any>
}