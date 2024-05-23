import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";
import ErrorHandler from "../../middleware/errorHandler";

export const getDoctorsFn =async(req:Req,adminRepository:IadminRepository,next:Next)=>{
    try{
        const doctors = await adminRepository.getDoctorsAdmnRepo(req)
        return doctors
    }catch(err:any){
        return next (new ErrorHandler(500,err.message))
    }
}