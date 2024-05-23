import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";
import ErrorHandler from "../../middleware/errorHandler";

export const getUsersFn = async (page:number,adminRepository:IadminRepository,next:Next)=>{
    try{
        const result = await adminRepository.getUsersAdmnRepo(page)
        return result

    }catch(err:any){
        return next (new ErrorHandler(500,err.message))
    }

}