import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc"
import { IHashPassword } from "../../interface/services/hashPassword"

export const changePasswordFn = async(id:string,password:string,bcrypt:IHashPassword,userRepository:IUserRepository):Promise<any>=>{
    try {
        const hashedPassword:string =await bcrypt.createHash(password as string)
        const result = await userRepository.changePasswordRepo(id,hashedPassword)
        return result
    } catch (error) {
        throw (error as Error)
    }
}