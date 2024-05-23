import {  Next } from "../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../interface/repositoryIntrfce/userRepoIntfc";
import { ICreateOtp } from "../interface/services/createOtp";
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repositoryIntrfce/otpRepository";

import { IUserUseCase } from "../interface/IntrfcUseCase/userUseCase";
import { Iuser } from "../../entity/userEntity";
import { IToken, IJwt } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";
import { IHashPassword } from "../interface/services/hashPassword";
import { IStripePayment } from "../interface/repositoryIntrfce/stripeIntrface";


import {
  login,
  registerUser,
  createUser,
  getDoctorFn,
  getBookingDetailsFn,
  verifyEmailFn,
  verifyOtpFn,
  updatePasswordFn,
  googleSignUPFn,
  getBookingFn,
  getUserInfoFn,
  getDoctorsFn,
  getUsersFn,
  createBookingFn,
  changePasswordFn,
  profileImageUploadFn,
  updateProfileFn
} from "./user/index";

import { DoctorWithSlots } from "../../entity/doctorWithSlots";
import { IBookingDetail } from "../../entity/bookingDtl";
import { ITransformedBooking } from "../../entity/transformedBooking";
import { IDoctor } from "../../entity/doctorEntity";
import { IBookingRepository } from "../interface/repositoryIntrfce/bookingRepository";
import { ISlot } from "../../entity/slotEntity";
import { cancelBookingFn } from "./user/cancelBookingFn";
import ICloudinaryRepository from "../interface/repositoryIntrfce/cloudinaryRepo";

export class UserUseCase implements IUserUseCase {

  private readonly userRepository: IUserRepository;
  private readonly otpGenerator: ICreateOtp;
  private readonly sendMail: ISendMail;
  private readonly otpRepository: IOtpRepository;
  private readonly bcrypt: IHashPassword;
  private readonly jwtToken: IJwt;
  private readonly stripePayment:IStripePayment;
  private readonly bookingRepository:IBookingRepository
  private readonly cloudinary:ICloudinaryRepository

  constructor(
    userRepository: IUserRepository,
    otpGenerator: ICreateOtp,
    sendMail: ISendMail,
    otpRepository: IOtpRepository,
    jwtToken: IJwt,
    bcrypt: IHashPassword,
    stripePayment:IStripePayment,
    bookingRepository:IBookingRepository,
    cloudinary:ICloudinaryRepository
  ) {
    this.userRepository = userRepository;
    this.otpGenerator = otpGenerator;
    this.sendMail = sendMail;
    this.otpRepository = otpRepository;
    this.jwtToken = jwtToken;
    this.bcrypt = bcrypt;
    this.stripePayment=stripePayment;
    this.bookingRepository=bookingRepository;
    this.cloudinary=cloudinary;
  }
  // user register-----------------------------------------------------

  async registerUser(
    {
      name,
      email,
      mob,
      password,
    }: {
      name: string;
      email: string;
      mob: number;
      password: string;
    },
    next: Next
  ): Promise<string | void> {
    try {
      let result = await registerUser(
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.otpRepository,
        this.bcrypt,
        this.jwtToken,
        name,
        email,
        mob,
        password,
        next
      )
      return result
    } catch (error: unknown) {
      catchError(error, next)
    }
  }



  //createuser-------------------------------------------------------
  async createUser(
    verificationCode: string,
    email:string,
    token: string,
    next: Next,
  ): Promise<Iuser | void> {
    try {
   await createUser(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        verificationCode,
        email,
        token,
        next
      )
    } catch (error: unknown) {
      catchError(error, next)
    }
  }


  //google signUp-----------------------------------------------------
  async googleSignUpUseCase(name:string,email:string,mob:number,password:string,next:Next):Promise<{user:Iuser,message:string,token?:IToken}|void>{
    try {
        const result = await googleSignUPFn(name,email,mob,password,this.userRepository,this.bcrypt,this.jwtToken)
        return result
    } catch (error) {
      catchError(error,next)
    }
  }

 
  // login--------------------------------------------------------------

  async login(
    { email, password }: { email: string; password: string }, next: Next
  ): Promise<{ user: Iuser; tokens: IToken } | void> {
    try {
      return await login(
        this.userRepository,
        this.bcrypt,
        this.jwtToken,
        email,
        password,
        next
      );
    } catch (error: unknown) {
      catchError(error, next)
    }
  }

  //get userInfo for chat 
  async getUserInfoUseCase(userId:string,next:Next):Promise<Iuser|void>{
    try {
        const result = await getUserInfoFn(userId,this.userRepository)
        return result
    } catch (error) {
      catchError(error,next)
    }
  }


  //get bookings details
  async getBookingDetailsUseCase(page:number,email:string,pageSize:number,next:Next):Promise<ITransformedBooking[]|void>{
    try {
      const result = await getBookingFn(page,email,pageSize,this.userRepository)
      return result
    } catch (error) {
      
    }
  }

  //verify email for forgot password
  async verifyEmailUseCase(email:string,next:Next):Promise<{message:string}|void>{
    try {
      const result = await verifyEmailFn(email,this.userRepository,this.otpRepository,this.sendMail,this.otpGenerator,next)
      return result
    } catch (error) {
      catchError(error as Error,next)
    }
  }



  // verify otp for forgot password 
  async verifyOtpUseCase(otp:string,email:string,next:Next):Promise<string|void>{
    try {
      const result = await verifyOtpFn(email,otp,this.otpRepository)
      return result
    } catch (error) {
      catchError (error as Error,next)
    }
  }

  //update password for forgot password
  async updatePasswordUseCase(password:string,email:string,next:Next):Promise<Iuser|void>{
    try{
      const result = await updatePasswordFn(password,email,this.bcrypt,this.userRepository)
      return result
    }catch(error){
      catchError(error as Error,next)
    }
  }

  //change password
  async changePasswordUseCase(id:string,password:string,next:Next):Promise<any>{
    try {
      const result = await changePasswordFn(id,password,this.bcrypt,this.userRepository)
      return result
    } catch (error) {
      catchError(error as Error,next)

    }
  }

  //upload profile image
  async uploadProfileImageUseCase(image:any,id:string,next:Next):Promise<Iuser|void>{
    try {
      const imageRslt = await this.cloudinary.saveToCloudinary(image,'PrjctSrdUsr')
      const result = await profileImageUploadFn(imageRslt,id,this.userRepository)
      return result

    } catch (error) {
      catchError(error as Error,next)
    }
  }

  //update profile
  async updateProfileUseCase(name:string,email:string,mob:string,id:string,next:Next):Promise<Iuser|void>{
    try {
      const result = await updateProfileFn(name,email,mob,id,this.userRepository)
      return result
    } catch (error) {
      catchError(error as Error,next)
    }
  }

  //get doctor for treatment booking
  async getDoctorUseCase (id:string,date:string,next:Next):Promise<{doctor:DoctorWithSlots[],message:string}|void>{
    try {
        const result = await getDoctorFn(id,date,this.userRepository)
        return result
    } catch (error) {
      catchError(error as Error,next)
    }
  }

  //get details for booking
  async bookingDetailsUseCase(treatmentId:string,sbTrtmntId:string,docId:string,next:Next):Promise<Partial<IBookingDetail>|void>{
      try {
        const result = await getBookingDetailsFn(treatmentId,sbTrtmntId,docId,this.userRepository)
        return result
      } catch (error) {
        catchError(error as Error,next)
      }
  }

  //payment 
  async paymentUseCase(amount:number,email:string,treatmentName:string,doctorId:string,treatmentId:string,subTreatmentId:string,consultingDate:string,next:Next):Promise<string|null>{
    try {
       const result = await this.stripePayment.StripePayment(amount,email,treatmentName,doctorId,treatmentId,subTreatmentId,consultingDate)
       return result
    } catch (error) {
      catchError (error as Error,next)
      return null
    }
  }

  //payment webhook 
  async paymentWebhookUseCase(req:any,next:Next):Promise<any>{
    try {
      const result = await this.stripePayment.PaymentSuccess(req)
      return result
    } catch (error) {
      catchError(error as Error,next)
    }
  }

  //create booking 
  async createBookingUseCase(bookingData:any,chargeId:string,next:any):Promise<any>{
    try{
      const result = await createBookingFn(bookingData,chargeId,this.bookingRepository)
      return result
    }catch(error){
      catchError(error as Error,next)
    }
  }

  //refund for cancel booking
  async cancelRefundBookingUseCase(id:string,amount:number,next:Next):Promise<any>{
    try {
      const result = await this.stripePayment.createRefund(id,amount)
      return result
    } catch (error) {
     catchError(error as Error,next) 
    }
  }

  //cancel booking if refund available
  async cancelBookingUseCase(id:string,next:Next):Promise<ISlot|void>{
    try {
      const result = await cancelBookingFn(id,this.bookingRepository)
      return result
    } catch (error) {
      catchError(error as Error,next)
    }
  }

  //get doctors for chat from booking
  async getDoctorsUseCase(email:string,next:Next):Promise<IDoctor[]|void>{
    try{
      const result = await getDoctorsFn(email,this.userRepository)
      return result
    }catch(error){
      catchError(error as Error,next)
    }
  }

  //get users for chat from booking
  async getUsersUseCase(docId:string,next:Next):Promise<Iuser[]|void>{
    try {
      const result = await getUsersFn(docId,this.userRepository);
      return result
    } catch (error) {
      catchError(error as Error,next)
    }
  }

  
}
