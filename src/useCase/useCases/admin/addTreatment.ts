import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ITreatmentRepository } from "../../interface/repositoryIntrfce/treatmentRepository";
import ErrorHandler from "../../middleware/errorHandler";

export const    addTreatment = async (
    treatmentRepository: ITreatmentRepository,
    req: Req,
    next: Next
) => {
    try {
        const { name, subTreatments }:any = req;
        const treatmentName:string = name
        const treatmentExist = await treatmentRepository.existTreatment(treatmentName, subTreatments)
        if (treatmentExist === 'not exist') {
            const result = await treatmentRepository.addTreatment(treatmentName, subTreatments)
            // Ensure result is not void before returning
            if (result) {
                return { treatment: result ,message:'added treatment'};
            } else {
                // Handle the case where result is void
                return; // Return void
            }
        }
        else if (treatmentExist === 'sub treatment not exists') {
            const updatedTreatment = await treatmentRepository.addSubTreatment(treatmentName, subTreatments);
            // Ensure updatedTreatment is not void before returning
            if (updatedTreatment) {
                return { treatment: updatedTreatment ,message:'added subTreatment'};
            } else {
                // Handle the case where updatedTreatment is void
                console.error('Failed to add sub-treatment');
                return; 
            }
        }
        else if(typeof treatmentExist !== 'string'){
            return { treatment:treatmentExist, message: 'Treatment and sub-treatment already exist' };
        }
    } catch (err: any) {
        return next(new ErrorHandler(500, err.message))
    }
}

