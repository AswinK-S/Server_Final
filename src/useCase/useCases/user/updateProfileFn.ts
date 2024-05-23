import { Iuser } from "../../../entity/userEntity";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";

export const updateProfileFn = async(name:string,email:string,mob:string,id:string,userRepository:IUserRepository):Promise<Iuser|void>=>{
    try {
        const result = await userRepository.updateProfileRepo(name,email,mob,id)
        return result
    } catch (error) {
        throw (error as Error)
    }
}