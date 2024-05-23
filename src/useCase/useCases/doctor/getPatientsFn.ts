import { IPatients } from "../../../entity/patientsForDoc";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";

export const getPatientsFn = async(id:string,limit:number,page:number,doctorRepository:IDoctorRepository):Promise<IPatients[]|void>=>{
    try {
        const result = await doctorRepository.getPatientsRepo(id,limit,page)
        
        return result
    } catch (error) {
        
    }
}