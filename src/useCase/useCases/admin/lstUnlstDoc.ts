import { Next } from "../../../frameworks/types/serverPackageTypes"
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo"

export const listUnlist = async (doctorRepository:IDoctorRepository, id:string,next:Next)=>{
    try{
        let result= await doctorRepository.list_UnlistDoc(id)
        return result
    }catch(err){

    }
}