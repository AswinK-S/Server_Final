import { IPrescriptionRepository } from "../../interface/repositoryIntrfce/prescriptionRepo"

export const addPrescriptionFn=async(prescription:string,docId:string,bookingId:string,userEmail:string,prescriptionRepository:IPrescriptionRepository):Promise<void|{message:string}>=>{
    try {
        const result = await prescriptionRepository.addPrescriptionRepo(prescription,docId,bookingId,userEmail)
        return result
    } catch (error) {
        throw(error as Error)
    }
}