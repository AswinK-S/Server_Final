import { Iuser } from "../../../entity/userEntity";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";
import { IHashPassword } from "../../interface/services/hashPassword";

export const updatePasswordFn = async(password:string,email:string,bcrypt:IHashPassword,userRepository:IUserRepository):Promise<Iuser|void>=>{
    try{
        const hashedPassword:string =await bcrypt.createHash(password as string)
        const result = await userRepository.updatePasswordRepo(hashedPassword,email)
        return result
    }catch(error){
        throw (error as Error)
    }
}