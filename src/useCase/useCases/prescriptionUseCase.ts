import { IPrescriptionUseCase } from "../interface/IntrfcUseCase/prescriptionUseCase";
import { IPrescriptionRepository } from "../interface/repositoryIntrfce/prescriptionRepo";

import {
    addPrescriptionFn,
    getPrescriptionFn
} from './prescription/index'

export class PrescriptionUseCase  implements IPrescriptionUseCase{
    
    private readonly prescriptionRepository:IPrescriptionRepository
    constructor(
        prescriptionRepository:IPrescriptionRepository,
    ){
        this.prescriptionRepository = prescriptionRepository
    }
    
    async addPrescriptionUseCase(prescription:string,docId:string,bookingId:string,userEmail:string):Promise<void|{message:string}>{
        try{
            const result = await addPrescriptionFn(prescription,docId,bookingId,userEmail,this.prescriptionRepository)
            return result
        }catch(error){
            throw(error as Error)
        }
    }

    async getPrescriptionUseCase(doctorName:string, treatmentName:string, subTreatmentName:string,
         consultationDate:string, userName:string,prescriptionId:string ):Promise<any>{
        try{
            console.log('in usecase');
            const prescription = await getPrescriptionFn(prescriptionId,this.prescriptionRepository) 
            console.log('prescription',prescription);
        }catch(error){
            throw (error as Error)
        }
    }
}