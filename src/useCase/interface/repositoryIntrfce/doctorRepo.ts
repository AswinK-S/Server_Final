import { IDoctor } from "../../../entity/doctorEntity";
import { IPatients } from "../../../entity/patientsForDoc";
import { Query } from "../../../entity/query";
import { ISlot } from "../../../entity/slotEntity";
import { Req } from "../../../frameworks/types/serverPackageTypes";

export interface    IDoctorRepository{
    addDoctor({ name, email, mob, password, address, experience, doctor_id, treatment,subTreatment,amount }:
      {name:string,email:string,mob:number,password:string | Promise<string >,address:string,experience:string,doctor_id:string,treatment:string,subTreatment:string,amount:number}):Promise<IDoctor>   
    isDoctorExist(email:string):Promise<IDoctor|string>
    isDocExistInMob(mob:number):Promise<IDoctor|string>
    list_UnlistDoc(id:string):Promise<string>
    findByEmail(email:string):Promise<{doctor:IDoctor}|{message?:string}>
    updateImage(image:string,id:string):Promise<IDoctor|void>
    updateDoc(image:string,id:string):Promise<IDoctor|void>
    updateDetailsRepo(id:string,query:Query):Promise<IDoctor|void>
    findDoctor(id:string):Promise<IDoctor|void>
    createSlotRepo(selectedShift:string,value:string,id:string):Promise<{slot:ISlot[],message:string}|void|{message:string}>
    getSlots(id:string):Promise<{slot:ISlot[],message:string}|void>
    updatePasswordRepo(id:string,hashedPassword:string):Promise<IDoctor|void>
    getPatientsRepo(id:string,limit:number,page:number):Promise<IPatients[]|void>

    //get doctors data for admin
    getDoctorsDataRepo(req:Req):Promise<object>
}