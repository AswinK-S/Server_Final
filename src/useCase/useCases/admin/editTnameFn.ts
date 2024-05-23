import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository"

export const editTnameFn = async(name:string,id:string,adminRepository:IadminRepository)=>{
    try {
        const result = await adminRepository.editTnameAdmnRepo(name,id)
        return result
    } catch (error) {
        throw (error as Error)
    }
} 