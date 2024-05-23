import { IOtpRepository } from "../../interface/repositoryIntrfce/otpRepository";

export const verifyOtpFn = async(otp:string,email:string,otpRepository:IOtpRepository):Promise<string|void>=>{
    try {
        const findOtpFrmDb = await otpRepository.findUser(email)
        if(findOtpFrmDb){
            const otpFromDb = findOtpFrmDb.otp
            if(otp === otpFromDb){
                return 'otp matched'
            }else{
                return 'otp not matched'
            }
        }
    } catch (error) {
        throw (error as Error)
    }
}