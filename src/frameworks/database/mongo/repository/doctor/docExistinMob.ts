import doctorModel from "../../models/doctorModel";
import { IDoctor } from "../../../../../entity/doctorEntity";

export const isDocExistInMob = async (mob:number):Promise<IDoctor|string> =>{
    try{

        const isDoc = await doctorModel.findOne({mob:mob})
        let result:IDoctor|string
        if(isDoc){
             result =isDoc
        }
        else{
             result ='doctor not exist in this mobile'
        }
        return result
    }catch(err:any){
        throw (err)
    }
}
