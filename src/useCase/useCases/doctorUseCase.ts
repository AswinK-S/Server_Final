import { IDoctor } from "../../entity/doctorEntity";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../interface/IntrfcUseCase/doctorUseCase";
import { IDoctorJwt, IToken } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";

import { IDoctorRepository } from "../interface/repositoryIntrfce/doctorRepo";
import ICloudinaryRepository from "../interface/repositoryIntrfce/cloudinaryRepo";


import {
    doc_login,
    updateProPic,
    updateProfileFn,
    updateDocFn,
    getDoctorFn,
    createSlotFn,
    getSlotsFn,
    getOtpFn,
    verifyOtpFn,
    updatePasswordFn,
    getPatientsFn,
    getOverviewFn,
    confirmConsultationFn
} from './doctor/index'


import { IHashPassword } from "../interface/services/hashPassword";
import { Query } from "../../entity/query";
import { ISlot } from "../../entity/slotEntity";
import { ISendMail } from "../interface/services/sendMail";
import { ICreateOtp } from "../interface/services/createOtp";
import { IOtpRepository } from "../interface/repositoryIntrfce/otpRepository";
import { IPatients } from "../../entity/patientsForDoc";
import { overview } from "../../entity/overView";
import { IBookingRepository } from "../interface/repositoryIntrfce/bookingRepository";
import { IBooking } from "../../entity/booking";

export class DoctorUseCase implements IDoctorUseCase {

    private readonly doctorRepository: IDoctorRepository;
    private readonly bcrypt: IHashPassword;
    private readonly jwtToken: IDoctorJwt;
    private readonly cloudinary: ICloudinaryRepository;
    private readonly sendMail: ISendMail;
    private readonly generateOtp: ICreateOtp
    private readonly otpRepository: IOtpRepository
    private readonly bookingRepository: IBookingRepository

    constructor(
        doctorRepository: IDoctorRepository,
        bcrypt: IHashPassword,
        jwtToken: IDoctorJwt,
        cloudinay: ICloudinaryRepository,
        sendMail: ISendMail,
        generateOtp: ICreateOtp,
        otpRepository: IOtpRepository,
        bookingRepository: IBookingRepository
    ) {
        this.doctorRepository = doctorRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken
        this.cloudinary = cloudinay
        this.sendMail = sendMail
        this.generateOtp = generateOtp
        this.otpRepository = otpRepository
        this.bookingRepository = bookingRepository
    }

    //login
    async login({ email, password, mob }: { email: string; password: string, mob: number }, next: Next): Promise<{ doctor: IDoctor; token: IToken } | void> {
        try {
            const result = await doc_login(
                this.doctorRepository,
                this.bcrypt,
                this.jwtToken,
                email,
                password,
                next)
            return result
        } catch (err: unknown) {
            catchError(err, next)
        }
    }

    //get doctor details
    async getDocDetailUseCase(id: string, next: Next): Promise<IDoctor | void> {
        try {
            const result = await getDoctorFn(id, this.doctorRepository)
            return result
        } catch (error: any) {
            catchError(error, next)
        }
    }

    //upload image
    async uploadProfileImage(image: any, id: string, next: Next): Promise<any | IDoctor> {
        try {
            //upload to cloudinary
            const response = await this.cloudinary.saveToCloudinary(image, 'projectSRd')
            //save to db
            if (response) {
                const res = await updateProPic(this.doctorRepository, response, id, next)
                return res
            }
        } catch (error: any) {
            catchError(error, next)
        }
    }

    //upload document
    async uploadDoc(image: any, id: string, next: Next): Promise<any | IDoctor> {
        try {
            const result = await this.cloudinary.saveToCloudinary(image, 'projectSRd')
            if (result) {
                const res = await updateDocFn(this.doctorRepository, result, id, next)
                return res;
            }
        } catch (error: any) {
            catchError(error, next)
        }
    }

    // get otp to change password 
    async changePasswordUseCase(name: string, email: string, next: Next): Promise<string | void> {
        try {
            const result = await getOtpFn(name, email, this.doctorRepository, this.generateOtp, this.sendMail, this.otpRepository, next)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //verify otp useCase
    async verifyOtpUseCase(email: string, otp: string, next: Next): Promise<string | void> {
        try {
            const result = await verifyOtpFn(email, otp, this.otpRepository)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //change password
    async updatePasswordUseCase(id: string, password: string, next: Next): Promise<IDoctor | void> {
        try {

            const result = await updatePasswordFn(id, password, this.bcrypt, this.doctorRepository)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //update doctor profile info
    async updateProfileUseCase(id: string, query: Query, next: Next): Promise<IDoctor | void> {
        try {
            const result = updateProfileFn(id, query, this.doctorRepository)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //create slot 
    async create_slot(selectedShift: string, value: string, id: string, next: Next): Promise<{ slot: ISlot[], message: string } | void | { message: string }> {
        try {
            const result = createSlotFn(selectedShift, value, id, this.doctorRepository)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //get slot
    async get_slots(id: string,pageNumber:number,pageSize:number, next: Next): Promise<{ slot: ISlot[], message: string } | void> {
        try {
            const result = await getSlotsFn(id,pageNumber,pageSize, this.doctorRepository)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //get patients 
    async getPatientsUseCase(id: string, limit: number, page: number, next: Next): Promise<IPatients[] | void> {
        try {
            const result = await getPatientsFn(id, limit, page, this.doctorRepository)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //get patients for overview
    async getOverviewUseCase(id: string, next: Next): Promise<overview | void> {
        try {
            const result = await getOverviewFn(id, this.bookingRepository)
            return result
        } catch (error) {
            catchError(error as Error, next)
        }
    }

    //confirm consultation
    async confirmConsultationUseCase(docId:string,bookingId:string,next:Next):Promise<IBooking|void>{
        try{
            const result = await confirmConsultationFn(docId,bookingId,this.bookingRepository)
            return result
        }catch(error){
            catchError(error as Error,next)
        }
    }
}
