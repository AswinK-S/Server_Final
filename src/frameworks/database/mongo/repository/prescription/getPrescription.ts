import { Iprescription } from "../../../../../entity/prescription";
import prescriptionModel from "../../models/prescriptionModel";

export const prescription = async(prescriptionId:string,prescriptionModels:typeof prescriptionModel):Promise<void|Iprescription>=>{
    try {
        const result = await prescriptionModels.findOne({_id:prescriptionId})
        if(result) return result
    } catch (error) {
        throw(error as Error)
    }
}