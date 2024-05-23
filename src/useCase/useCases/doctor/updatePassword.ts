import { IDoctor } from "../../../entity/doctorEntity"
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo"
import { IHashPassword } from "../../interface/services/hashPassword"

export const updatePasswordFn = async(id:string,password:string,bcrypt:IHashPassword,doctorRepository:IDoctorRepository):Promise<IDoctor|void>=>{
    try {
        
        const hashedPassword:string =await  bcrypt.createHash(password as string)
        const result = await doctorRepository.updatePasswordRepo(id, hashedPassword);
        return result
    } catch (error) {
        throw (error as Error)
    }
}