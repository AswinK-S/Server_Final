import { IDoctor } from "../../../../entity/doctorEntity";
import { IPatients } from "../../../../entity/patientsForDoc";
import { Query } from "../../../../entity/query";
import { ISlot } from "../../../../entity/slotEntity";
import { IDoctorRepository } from "../../../../useCase/interface/repositoryIntrfce/doctorRepo";
import { Req } from "../../../types/serverPackageTypes";
import bookingModel from "../models/booking";
import doctorModel from "../models/doctorModel";
import slotModel from "../models/slot";
import userModel from "../models/userModel";

import {
    addDoctorRepo,
    isDoctorExist,
    lstUnlstDoc,
    findDoctorByEmail,
    isDocExistInMob,
    uploadImgLink,
    updateDoctorProfile,
    uploadDocument,
    findById,
    createSlot,
    getSlotsRepo,
    updatePassword,
    getPatients,
    getDoctorsData
} from './doctor/index'

export class DoctorRepository implements IDoctorRepository{

    constructor(
        private doctorModels: typeof doctorModel,
        private slotModels : typeof slotModel,
        private bookingModels: typeof bookingModel,
        private userModels: typeof userModel
    ){}

    //add new doctor
    async addDoctor({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment ,amount}: IDoctor): Promise<IDoctor> {
        try{
            return  await addDoctorRepo({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment,amount })
        }catch(err:any){
            throw (err)
        }
    }

    // doctor login 
    async findByEmail(email:string):Promise<{doctor:IDoctor}|{message?:string}>{
       try{
        const result = await findDoctorByEmail(email,this.doctorModels)
        let doctor:IDoctor;
        let message:string;
        if(result ===null){
            message='doctor not exist in this mail'
            return {message}
        }else{
           
            return {doctor:result}
        }
       }catch(err){
        throw (err)
       }
    }

    //get doctor details
    async findDoctor(id: string): Promise<void | IDoctor> {
        try {
            const result = await findById(id,this.doctorModels)
            if(result)return result
            
        } catch (error:any) {
            throw (error)
        }
    }


    //check if the doctor already exists in this email
    async isDoctorExist(email: string):Promise<IDoctor|string > {
        try{
            return await isDoctorExist(email)
        }catch(err:any){

            throw (err)
        }

    }

    //check if the doctor already exists in this mob
    async isDocExistInMob(mob:number):Promise<IDoctor|string>{
        try{
            return await isDocExistInMob(mob)
        }catch(err:any){
            throw(err)
        }
    }


    // list or unlist doctor 
    async list_UnlistDoc(id:string):Promise<string>{
        try{
            let result= await lstUnlstDoc(id)
            return result
        }catch(err:any){
            throw(err)
        }
    }

    //upload profile picture of doctor
    async updateImage(image:string,id:string):Promise<IDoctor|void>{
        try {
            const res = await uploadImgLink(image,id)
            return res
        } catch (err:any) {
            throw (err)
        }
    }

    // update document 
    async updateDoc(image:string,id:string):Promise<IDoctor|void>{
        try{

            const result = await uploadDocument(image,id,this.doctorModels)
            return result
        }catch(error:any){
            throw(error)
        }
    }

    //update details
    async updateDetailsRepo(id:string,query:Query):Promise<IDoctor|void>{
        try {
            const result = await updateDoctorProfile(query,id)
            return result
        } catch (error:any) {
            throw (error)
        }
    }

    // update password 
    async updatePasswordRepo(id:string,hashedPassword:string):Promise<IDoctor|void>{
        try {
            const result = await updatePassword(id,hashedPassword,this.doctorModels)
            if(result)return result
        } catch (error) {
            throw (error as Error)
        }
    }


    //create slot
    async createSlotRepo(selectedShift:string,value:string,id:string):Promise<{slot:ISlot[],message:string}|void|{message:string}>{
        try {
            const result = await createSlot(selectedShift,value,id,this.slotModels,this.doctorModels)
            return result 
        } catch (error) {
            throw (error as Error)
        }
    }

    //get slots
    async getSlots(id:string):Promise<{slot:ISlot[],message:string}|void>{
        try {
            const result = await getSlotsRepo(id,this.slotModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    //get Patients
    async getPatientsRepo(id:string,limit:number,page:number):Promise<IPatients[]|void>{
        try {
            const result = await getPatients(id,limit,page,this.bookingModels,this.userModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    //get doctors data for admin
    async getDoctorsDataRepo(req:Req):Promise<object>{
        try {
            const result = await getDoctorsData(this.doctorModels)
            return result 
        } catch (error) {
            throw(error as Error)
        }
    }
}