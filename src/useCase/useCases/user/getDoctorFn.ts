import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";
import { DoctorWithSlots } from "../../../entity/doctorWithSlots";

export const getDoctorFn = async(id:string,date:string,userRepository:IUserRepository):Promise<{doctor:DoctorWithSlots[],message:string}|void>=>{
try {
    const result = await userRepository.getDoctorsforTrtmntRepo(id,date)
    return result
} catch (error) {
    throw error as Error
}
}