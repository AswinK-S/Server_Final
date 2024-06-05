import { Iprescription } from "../../../../entity/prescription";
import { IPrescriptionRepository } from "../../../../useCase/interface/repositoryIntrfce/prescriptionRepo";
import bookingModel from "../models/booking";
import prescriptionModel from "../models/prescriptionModel";
import userModel from "../models/userModel";

import{
    addPrescription,
    prescription
}from './prescription/index'

export class PrescriptionRepository implements IPrescriptionRepository {

    constructor(
        private userModels:typeof userModel,
        private prescriptionModels :typeof prescriptionModel,
        private bookingModels:typeof bookingModel
    ){}

    async  addPrescriptionRepo(prescription:string,docId:string,bookingId:string,userEmail:string):Promise<void|{message:string}>{
        try{
            const result = await addPrescription(prescription,docId,bookingId,userEmail,this.prescriptionModels,this.userModels,this.bookingModels)
            return result
        }catch(error){
            throw(error as Error)
        }
    }


    async getPrescriptionRepo(prescriptionId:string):Promise<void|Iprescription>{
        try {
            const result = await prescription(prescriptionId,this.prescriptionModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }
}