import doctorModel from "../../models/doctorModel";
import { IDoctor } from "../../../../../entity/doctorEntity";

export const isDoctorExist = async (email:string):Promise<IDoctor|string> =>{
    try{

        const isDoc = await doctorModel.findOne({email:email})
        let result:IDoctor|string
        if(isDoc){
             result =isDoc
        }
        else{
             result ='doctor not exist in this email'
        }
        return result
    }catch(err:any){
        throw (err)
    }
}
