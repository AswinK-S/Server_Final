export interface IPrescriptionRepository{
    addPrescriptionRepo(prescription:string,docId:string,userEmail:string):Promise<void|{message:string}>
}