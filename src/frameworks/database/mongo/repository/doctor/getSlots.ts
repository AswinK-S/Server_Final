import { ISlot } from "../../../../../entity/slotEntity";
import slotModel from "../../models/slot";

export const getSlotsRepo = async(id:string,slotModels:typeof slotModel):Promise<{slot:ISlot[],message:string}|void> =>{
    try {
        const currentDate: Date = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const result = await slotModels.find({doctorId:id,date: { $gte: currentDate } })

        const data = Array.isArray(result)?result:[result]
        if (data){
        return {slot:data,message:'slots'}
        }
    } catch (error) {
        throw(error as Error)
    }
}