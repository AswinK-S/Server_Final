import { IPrescriptionRepository } from "../../interface/repositoryIntrfce/prescriptionRepo"

export const addPrescriptionFn=async(prescription:string,docId:string,userEmail:string,prescriptionRepository:IPrescriptionRepository):Promise<void|{message:string}>=>{
    try {
        const result = await prescriptionRepository.addPrescriptionRepo(prescription,docId,userEmail)
        return result
    } catch (error) {
        throw(error as Error)
    }
}