import { Iuser } from "../../../entity/userEntity"
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc"

export const profileImageUploadFn = async(imageRslt:string,id:string,userRepository:IUserRepository):Promise<Iuser|void>=>{
    try {
        const result = await userRepository.uploadProfileImgRepo(imageRslt,id)
        return result
    } catch (error) {
        throw (error as Error)
    }
}