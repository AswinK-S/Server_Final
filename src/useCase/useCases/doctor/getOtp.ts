import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo"
import { IOtpRepository } from "../../interface/repositoryIntrfce/otpRepository";
import { ICreateOtp } from "../../interface/services/createOtp";
import { ISendMail } from "../../interface/services/sendMail";
import ErrorHandler from "../../middleware/errorHandler";

export const getOtpFn = async (name:string,email:string,doctorRepository:IDoctorRepository,generateOtp:ICreateOtp,sendMail:ISendMail,otpRepository:IOtpRepository, next:Next):Promise<string|void> =>{
    try {
        //check whether the doctor is in this email
        const isDoc = await doctorRepository.isDoctorExist(email)

        if (!isDoc) {
            return next(
                new ErrorHandler(400, "doctor not exist in this mail id")
            )
        }

        const findOtp = await otpRepository.findUser(email)
        

        if(findOtp){
            await sendMail.sendEmailVerification(name, email, findOtp.otp as string)

            return 'success'
        }

        const otp = await generateOtp.generateOtp()
            const isEmailsend = await sendMail.sendEmailVerification(name, email, otp)
            await otpRepository.createOtpUserCollection({ email, otp })


            if(otp && isEmailsend.success){
                return 'success'
            }else{
                return 'something went wrong'
            }

    } catch (error) {
        throw (error as Error)
    }
}