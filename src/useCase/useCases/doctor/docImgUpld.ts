import { IDoctor } from "../../../entity/doctorEntity"
import { Next } from "../../../frameworks/types/serverPackageTypes"
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";

export const updateProPic =async(doctorRepository:IDoctorRepository,img:string,id:string,next:Next):Promise<IDoctor|void>=>{
    try {
        const result = await doctorRepository.updateImage(img,id)
        if(result){
            result.password=''
            return result
        }
    } catch (error:any) {
        throw (error)
    }
}