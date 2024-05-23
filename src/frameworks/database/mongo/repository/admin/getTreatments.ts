import { Req } from "../../../../types/serverPackageTypes";
import treatmentModel from "../../models/treatmentModel";

export const getTreatmentsRepo = async(req:Req,treatMentModels:typeof treatmentModel)=>{
    try {
        const result =await treatMentModels.find({})
        return result
    } catch (error) {
        throw (error)
    }

}