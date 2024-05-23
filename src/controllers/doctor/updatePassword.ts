import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../../useCase/interface/IntrfcUseCase/doctorUseCase";
import ErrorHandler from "../../useCase/middleware/errorHandler";

export class UpdatePasswordController {

    private doctorUseCase : IDoctorUseCase
    constructor(
        doctorUseCase:IDoctorUseCase
    ){
        this.doctorUseCase=doctorUseCase;
    }

    async updatePassword(req:Req,res:Res,next:Next){
        try {
            const {id,password}:{id:string,password:string} =req.body
            const result = await this.doctorUseCase.updatePasswordUseCase(id,password,next)
            if(result){
                res.status(200).json({message:'success'})
            }
            
        } catch (error) {
            next (new ErrorHandler(500,error as Error))
        }
    }
}