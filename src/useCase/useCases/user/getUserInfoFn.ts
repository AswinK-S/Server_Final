import { Iuser } from "../../../entity/userEntity";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";

export const getUserInfoFn = async(userId:string,userRepository:IUserRepository):Promise<Iuser|void>=>{
    try {
        const result = await userRepository.getUserInfoRepo(userId)
        return result
    } catch (error) {
        throw (error as Error)
    }
}