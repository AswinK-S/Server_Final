import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { IUserUseCase } from "../../useCase/interface/IntrfcUseCase/userUseCase";
import ErrorHandler from "../../useCase/middleware/errorHandler";

export class ResendOtpController {
    private userUseCase:IUserUseCase
    constructor(userUseCase:IUserUseCase){
        this.userUseCase =userUseCase
    }

    async resendOtp(req:Req,res:Res,next:Next){
            try{
                const {name,email,mob,password}:{name:string,email:string,mob:number,password:string}=req.body
                const result = await this.userUseCase.registerUser(req.body,next)
                if (result){
                    res.status(201).json(result)
                }   
            }catch(error){
                return next(new ErrorHandler(500,error as Error))
            }
    }
}