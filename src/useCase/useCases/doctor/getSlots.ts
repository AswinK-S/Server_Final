import { ISlot } from "../../../entity/slotEntity";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";

export const getSlotsFn = async(id:string,
    pageNumber:number,
    pageSize:number,
    slotRepository:IDoctorRepository ):Promise<{slot:ISlot[],message:string}|void>=>{
    try {
        const result = await slotRepository.getSlots(id,pageNumber,pageSize)
        return result
    } catch (error) {
        throw (error as Error)
    }
}