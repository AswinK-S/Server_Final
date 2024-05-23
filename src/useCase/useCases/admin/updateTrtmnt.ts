import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";
import { ISubTreatment } from "../../../entity/subTrtmnt";

export const updateTreatmentFn = async(id:string,subTreatments:ISubTreatment[],adminRepository:IadminRepository)=>{
    try {
        const result  = await adminRepository.updateTrtmntAdmnRepo(id,subTreatments) 
        return result;
    } catch (error:any) {
        throw (error)
    }
}