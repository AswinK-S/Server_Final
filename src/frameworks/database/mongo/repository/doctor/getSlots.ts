import { ISlot } from "../../../../../entity/slotEntity";
import slotModel from "../../models/slot";

export const getSlotsRepo = async(id:string,pageNumber:number,pageSize:number,slotModels:typeof slotModel):Promise<{slot:ISlot[],message:string}|void> =>{
    try {
      
        const skip = (pageNumber - 1) * pageSize;

        const result = await slotModels.find({doctorId:id }).skip(skip).limit(pageSize)
        const data = Array.isArray(result)?result:[result]
        if (data){
        return {slot:data,message:'slots'}
        }
    } catch (error) {
        throw(error as Error)
    }
}