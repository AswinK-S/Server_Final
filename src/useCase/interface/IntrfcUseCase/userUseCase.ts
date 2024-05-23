import { IBookingDetail } from "../../../entity/bookingDtl";
import { IDoctor } from "../../../entity/doctorEntity";
import { DoctorWithSlots } from "../../../entity/doctorWithSlots";
import { ISlot } from "../../../entity/slotEntity";
import { ITransformedBooking } from "../../../entity/transformedBooking";
import { Iuser } from "../../../entity/userEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";

export interface IUserUseCase {

    // register user data type specifiying 
     registerUser({name,email,mob,password}:{name:string,email:string,mob:number,password:string},next:Next):Promise<string | void>

    //create user 
    createUser(verificationCode:string,email:string,token:string,next:Next):Promise<Iuser|void>

    // userlogin
    login({email,password}:{email:string;password:string},next:Next):Promise <{user:Iuser;tokens:IToken} | void>

    //google auth signUp
    googleSignUpUseCase(name:string,email:string,mob:number,password:string,next:Next):Promise<{user:Iuser,message:string,token?:IToken}|void>

    //get user info for chat 
    getUserInfoUseCase(userId:string,next:Next):Promise<Iuser|void>

    //get doctor details  for treatment booking
    getDoctorUseCase (id:string,date:string,next:Next):Promise<{doctor:DoctorWithSlots[],message:string}|void>

    //  get all bookings details for user
    getBookingDetailsUseCase(page:number,email:string,pageSize:number,next:Next):Promise<ITransformedBooking[]|void>

    bookingDetailsUseCase(treatmentId:string,sbTrtmntId:string,docId:string,next:Next):Promise<Partial<IBookingDetail>|void>
    //booking payment
    paymentUseCase(amount:number,email:string,treatmentName:string,doctorId:string,treatmentId:string,subTreatmentId:string,consultingDate:string,next:Next):Promise<string|null>
    //webhook payment
    paymentWebhookUseCase(req:any,next:Next):Promise<any>
    //createBooking
    createBookingUseCase(bookingData:any,chargeId:string,next:Next):Promise<any>
    //verify email for forgot password
    verifyEmailUseCase(email:string,next:Next):Promise<{message:string}|void>
    //verify otp for forgot password
    verifyOtpUseCase(otp:string,email:string,next:Next):Promise<string|void>
    //update password for forgot password
    updatePasswordUseCase(password:string,email:string,next:Next):Promise<Iuser|void>
    //get doctors for chat from booking
    getDoctorsUseCase(email:string,next:Next):Promise<IDoctor[]|void>
    //get the users for chat from booking
    getUsersUseCase(docId:string,next:Next):Promise<Iuser[]|void>
    //refund for cancel booking
    cancelRefundBookingUseCase(id:string,amount:number,next:Next):Promise<any>
    //cancel booking if refund available
    cancelBookingUseCase(id:string,next:Next):Promise<ISlot|void>

    //change password
    changePasswordUseCase(id:string,password:string,next:Next):Promise<any>
    //upload profile image
    uploadProfileImageUseCase(image:any,id:string,next:Next):Promise<Iuser|void>
    //update profile
    updateProfileUseCase(name:string,email:string,mob:string,id:string,next:Next):Promise<Iuser|void>
}