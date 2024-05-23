import { IOtpRepository } from "../../interface/repositoryIntrfce/otpRepository";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";
import { Iuser } from "../../../entity/userEntity";
import { IJwt } from "../../interface/services/jwt.types";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middleware/errorHandler";

export const createUser = async (
    userRepository:IUserRepository,
    otpRepository:IOtpRepository,
    jwtVerifier:IJwt,
    verificationCode:string,
    email:string,
    token:string,
    next:Next,
)=>{
    try{
        const decode = (await jwtVerifier.verifyJwt(token)) as Iuser

        if(!decode)
        return next(new ErrorHandler(400,'token has been expired , register again'))
        
        const otpUser = await otpRepository.findUser(email)
        if(otpUser){
            if(otpUser.otp !==verificationCode){
                return next(new ErrorHandler(400,'Wrong verification code'))
            }
        }
        decode.isVerified = true;
        const newUser =await userRepository.createUser(decode)
        newUser.password=''
        return newUser
        
    }catch(err ){
        throw err as Error
    }

}