export interface IPrescriptionUseCase{
    addPrescriptionUseCase(prescription:string,docId:string,userEmail:string):Promise<void|{message:string}>
}