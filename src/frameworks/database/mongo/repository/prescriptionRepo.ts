import { IPrescriptionRepository } from "../../../../useCase/interface/repositoryIntrfce/prescriptionRepo";
import prescriptionModel from "../models/prescriptionModel";
import userModel from "../models/userModel";
import{
    addPrescription
}from './prescription/addPrescription'

export class PrescriptionRepository implements IPrescriptionRepository {

    constructor(
        private userModels:typeof userModel,
        private prescriptionModels :typeof prescriptionModel
    ){}

    async  addPrescriptionRepo(prescription:string,docId:string,userEmail:string):Promise<void|{message:string}>{
        try{
            const result = await addPrescription(prescription,docId,userEmail,this.prescriptionModels,this.userModels)
            return result
        }catch(error){
            throw(error as Error)
        }
    }

}