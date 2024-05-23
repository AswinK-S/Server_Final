import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../../useCase/interface/IntrfcUseCase/doctorUseCase";
import ErrorHandler from "../../useCase/middleware/errorHandler";

export class VerifyOtpController {
    private doctorUseCase :IDoctorUseCase
    constructor(doctorUseCase:IDoctorUseCase){
        this.doctorUseCase =doctorUseCase
    }


    async verifyOtp(req:Req,res:Res,next:Next){
        try {
            
            const {email,otp}:{email:string,otp:string}=req.body
            const result = await this.doctorUseCase.verifyOtpUseCase(email,otp,next)
            res.status(201).json({message:result})

        } catch (error) {
            return next (new ErrorHandler (500,error as Error))
        }
    }
}