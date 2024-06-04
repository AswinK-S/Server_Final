import { IPrescriptionUseCase } from "../interface/IntrfcUseCase/prescriptionUseCase";
import { IPrescriptionRepository } from "../interface/repositoryIntrfce/prescriptionRepo";

import {
    addPrescriptionFn
} from './prescription/addPrescriptionFn'

export class PrescriptionUseCase  implements IPrescriptionUseCase{
    
    private readonly prescriptionRepository:IPrescriptionRepository
    constructor(
        prescriptionRepository:IPrescriptionRepository,
    ){
        this.prescriptionRepository = prescriptionRepository
    }
    
    async addPrescriptionUseCase(prescription:string,docId:string,userEmail:string):Promise<void|{message:string}>{
        try{
            const result = await addPrescriptionFn(prescription,docId,userEmail,this.prescriptionRepository)
            return result
        }catch(error){
            throw(error as Error)
        }
    }
}