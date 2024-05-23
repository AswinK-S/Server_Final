import { Query } from "../../../../../entity/query";
import { IDoctor } from "../../../../../entity/doctorEntity";
import doctorModel from "../../models/doctorModel";

export const updateDoctorProfile = async (query:Query,id:string):Promise<IDoctor| void> =>{
    try {
        
        const updateQuery = {$set:{...query}}
        const result = await doctorModel.findByIdAndUpdate({_id:id},updateQuery,{ new: true })
        if (result)return result
    } catch (error:any) {
        throw(error)
    }
}