import { Req } from "../../../../types/serverPackageTypes";
import doctorModel from "../../models/doctorModel";

export const getDoctorsRepo = async(req:Req,doctorModels: typeof doctorModel)=>{
    try{
        const result = await doctorModels.find({})
        return result
    }catch(err:any){
        throw (err.message)
    }
}