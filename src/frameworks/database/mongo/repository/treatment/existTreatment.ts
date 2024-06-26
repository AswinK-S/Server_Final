import { ITreatment } from "../../../../../entity/treatmentEntity";
import treatmentModel from "../../models/treatmentModel";

export const  existTreatment = async (treatmentName: string, subTreatment?: string): Promise<ITreatment | string> => {
    try {
        let existingTreatment = await treatmentModel.findOne({ name: treatmentName });
        let result: string | any
        result ='not exist'

        //check if the treatment exists
        if (existingTreatment) {
            
            //check if subtreatment exists
            if (subTreatment) {
                const existingSubTreatment = await treatmentModel.findOne({
                    name: treatmentName,
                    subTreatments: { $in: [subTreatment] }
                });

                if (existingSubTreatment) {
                    result = existingSubTreatment;
                } else {
                    result = 'sub treatment not exists';
                }
            } 
        }

        return result;
    } catch (err) {
        throw err;
    }
}