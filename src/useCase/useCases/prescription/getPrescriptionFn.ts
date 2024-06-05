import { Iprescription } from "../../../entity/prescription";
import { IPrescriptionRepository } from "../../interface/repositoryIntrfce/prescriptionRepo";

export const getPrescriptionFn = async(prescriptionId:string,prescriptionRepositoy:IPrescriptionRepository):Promise<void|Iprescription>=>{
    try {
        const result = await prescriptionRepositoy.getPrescriptionRepo(prescriptionId)
        return result
    } catch (error) {
        throw (error as Error)
    }
}