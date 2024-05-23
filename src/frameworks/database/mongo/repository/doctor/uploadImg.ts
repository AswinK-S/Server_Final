import { IDoctor } from "../../../../../entity/doctorEntity";
import doctorModel from "../../models/doctorModel";

export const  uploadImgLink = async (image:string,id:string):Promise<IDoctor|void>=>{
    try{
        const res = await doctorModel.findOneAndUpdate({_id:id},{$set:{image:image}},{$upsert:true,new:true})
        if(res){
            return res
        }
    }catch(error:any) {
        throw (error)
    }
}