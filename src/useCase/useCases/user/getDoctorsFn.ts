import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";

export const getDoctorsFn =async(email:string,userRepository:IUserRepository):Promise<any>=>{
    try {
        const result = await userRepository.getDoctorsDetailsRepo(email)
        return result
    } catch (error) {
        throw (error as Error)
    }
}