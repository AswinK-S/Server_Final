import { IOtpRepository } from "../../interface/repositoryIntrfce/otpRepository";

export const verifyOtpFn = async(email:string,otp:string,otpRepository:IOtpRepository):Promise<string|void>=>{
    try{
        const otpFromDb = await otpRepository.findUser(email)
      
        if(otpFromDb ){
            const otpF = otpFromDb.otp
            if(otp === otpF){
                return 'otp matched'
            }else{
                return 'otp not matched'
            }
        }
       
        
    }catch(error){
        throw(error as Error)
    }
}