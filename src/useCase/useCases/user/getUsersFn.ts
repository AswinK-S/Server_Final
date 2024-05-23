import { Iuser } from "../../../entity/userEntity";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";

export const getUsersFn = async (docId:string,userRepository:IUserRepository):Promise<Iuser[]|void>=>{
    try {
        const result = await userRepository.getUsersRepo(docId)
        return result
    } catch (error) {
        throw (error as Error)
    }
}