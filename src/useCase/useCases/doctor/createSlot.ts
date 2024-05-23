import { ISlot } from "../../../entity/slotEntity";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";

export const createSlotFn = async(selectedShift:string,value:string,id:string,doctorRepository:IDoctorRepository):Promise<{slot:ISlot[],message:string}|void|{message:string}>=>{
    try {
        const result = await doctorRepository.createSlotRepo(selectedShift,value,id)
        return result
    } catch (error) {
        throw (error as Error)
    }
}