import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repositoryIntrfce/otpRepository";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";
import { ICreateOtp } from "../../interface/services/createOtp";
import { ISendMail } from "../../interface/services/sendMail";

export const verifyEmailFn = async (email: string, userRepository: IUserRepository, otpRepository: IOtpRepository, sendMail: ISendMail, otpGenerator: ICreateOtp, next: Next): Promise<{ message: string } | void> => {
    try {

        const isUser = await userRepository.findUsersByEmail(email)

        if (!isUser) {
            return { message: 'Invalid mail id' }
        }

        //check whether the otp is already generated
        const isOtp = await otpRepository.findUser(email)
        if (isOtp) {
            const otpResult = await sendMail.sendEmailVerification(isUser.name, email, isOtp.otp as string)
            return { message: 'success' }
        }

        if (!isOtp) {
            const otp = await otpGenerator.generateOtp()
            const isEmailsend = await sendMail.sendEmailVerification(isUser.name, email, otp)
            await otpRepository.createOtpUserCollection({ email, otp })

            if (otp && isEmailsend.success) {
                return { message: 'success' }
            }
        }

    } catch (error) {
        throw (error as Error)
    }
}