import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";
import { ICreateOtp } from "../../interface/services/createOtp";
import { ISendMail } from "../../interface/services/sendMail";
import ErrorHandler from "../../middleware/errorHandler";
import { IOtpRepository } from "../../interface/repositoryIntrfce/otpRepository";
import { IHashPassword } from "../../interface/services/hashPassword";
import { IJwt } from "../../interface/services/jwt.types";

export const registerUser = async (
    userRepository: IUserRepository,
    sendMail: ISendMail,
    otpGenerator: ICreateOtp,
    otpRepository: IOtpRepository,
    bcrypt: IHashPassword,
    jwtTokenGenerator: IJwt,
    name: string,
    email: string,
    mob: number,
    password: string | Promise<string>,
    next: Next
): Promise<string | void> => {
    try {
        // checking whether the user exists in the same email
        const isUserExistInMail = await userRepository.findUsersByEmail(email)

        if (isUserExistInMail) {
            return next(
                new ErrorHandler(400, "user!!! already exist in the same mail id")
            )
        }

        // check whether the otp is already send within the time
        const isUserOnOtpRepo = await otpRepository.findUser(email)

        if (isUserOnOtpRepo) {
            //send the old otp
            await sendMail.sendEmailVerification(name, email, isUserOnOtpRepo.otp as string)
            const hashedPassword = await bcrypt.createHash(password as string)
            password = hashedPassword
            const JwtToken = await jwtTokenGenerator.createVerificationJwt({ name, email, password, mob })
            return JwtToken
        }

        else {
            const otp = await otpGenerator.generateOtp()
            await otpRepository.createOtpUserCollection({ email, otp })
            await sendMail.sendEmailVerification(name, email, otp)

            const hashedPassword = await bcrypt.createHash(password as string)
            password = hashedPassword

            const JwtToken = await jwtTokenGenerator.createVerificationJwt({ name, email, password, mob })

            return JwtToken
        }

    } catch (error) {
        return next(
            new ErrorHandler(500, error as Error)
        )
    }
}
