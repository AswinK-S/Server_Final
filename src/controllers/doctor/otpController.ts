import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../../useCase/interface/IntrfcUseCase/doctorUseCase";
import ErrorHandler from "../../useCase/middleware/errorHandler";

export class GetOtpController {
    private doctorUseCase:IDoctorUseCase
    constructor(doctorUseCase:IDoctorUseCase){
        this.doctorUseCase = doctorUseCase
    }

    async changePassword(req:Req,res:Res,next:Next){

        try {
            const {email,name}:{email:string,name:string} = req.body
            const result = await this.doctorUseCase.changePasswordUseCase(name,email,next)
            if(result==='success')
            res.status(201).json({message:'Otp send successfully'})
        } catch (error) {
            return next (new ErrorHandler(500, error as Error))
        }

    }
}