import { IDoctor } from "../../../../../entity/doctorEntity";
import doctorModel from "../../models/doctorModel";

export const addDoctorRepo  = async({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment,amount }: IDoctor):Promise <IDoctor>=>{
    try{    
       const doc={name, email, mob, password, address, experience, doctor_id, treatment,subTreatment ,amount}
       let newDoctor = await doctorModel.create({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment,amount })
       return newDoctor.toObject() as IDoctor
    }catch(err:any){
        throw (err)
    }
}