import { IadminUseCase } from "../interface/IntrfcUseCase/adminUseCase";
import { IadminRepository } from "../interface/repositoryIntrfce/adminRepository";
import { IHashPassword } from "../interface/services/hashPassword";
import { IadminJwt, IToken } from "../interface/services/jwt.types";
import { Iadmin } from "../../entity/adminEntity";
import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { catchError } from "../middleware/catchError";
import { ISubTreatment } from "../../entity/subTrtmnt";

// import { adlogin } from "./admin/login";
// import { addTreatment } from "./admin/addTreatment";

import {
    addDoctor,
    addTreatment,
    adlogin,
    block,
    listUnlist,
    getUsersFn,
    getDoctorsFn,
    getTreatmentFn,
    trtmntStsFn,
    findTreatmentFn,
    rmvSubTrtmntFn,
    updateTreatmentFn,
    verifDoctorFn,
    editTnameFn,
    dashDataFn
} from './admin/index'

import { ITreatmentRepository } from "../interface/repositoryIntrfce/treatmentRepository";
import { ITreatment } from "../../entity/treatmentEntity";
import { NextFunction } from "express";
import { IDoctor } from "../../entity/doctorEntity";
import { IDoctorRepository } from "../interface/repositoryIntrfce/doctorRepo";

import { IUserRepository } from "../interface/repositoryIntrfce/userRepoIntfc";
import { Iuser } from "../../entity/userEntity";
import { ISendMail } from "../interface/services/sendMail";
import { IBookingRepository } from "../interface/repositoryIntrfce/bookingRepository";

export class AdminUseCase implements IadminUseCase {

    private adminRepository: IadminRepository;
    private bcrypt: IHashPassword;
    private jwtToken: IadminJwt;
    private treatmentRepository: ITreatmentRepository;
    private doctorRepository: IDoctorRepository;
    private userRepository: IUserRepository;
    private sendMail: ISendMail;
    private bookingRepository:IBookingRepository;

    constructor(
        adminRepository: IadminRepository,
        bcrypt: IHashPassword,
        jwtToken: IadminJwt,
        treatmentRepository: ITreatmentRepository,
        doctorRepository: IDoctorRepository,
        userRepository: IUserRepository,
        sendMail: ISendMail,
        bookingRepository:IBookingRepository
    ) {
        this.adminRepository = adminRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken;
        this.treatmentRepository = treatmentRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.sendMail = sendMail;
        this.bookingRepository = bookingRepository

    }

    //admin login
    async adlogin({ email, password }: { email: string; password: string; }, next: Next): Promise<{ admin: Iadmin; tokens: IToken; } | void> {
        try {
            return await adlogin(
                this.adminRepository,
                this.bcrypt,
                this.jwtToken,
                email,
                password,
                next
            )
        } catch (error: unknown) {
            catchError(error, next)
        }
    }


    // add treatment
    async addTreatment(req: Req, next: Next): Promise<{ treatment: ITreatment; message?: string; } | void> {
        try {
            // Call the actual addTreatment function and store the result
            const result = await addTreatment(this.treatmentRepository, req, next);
            return result

        } catch (err) {
            catchError(err as Error, next);
        }
    }

    //edit treatment name
    async editTnameUseCase(name:string,id:string,next:Next):Promise<ITreatment|void>{
        try {
            const result = await editTnameFn(name,id,this.adminRepository)
            return result
        } catch (error) {
            catchError(error as Error,next)
        }
    }

    // update Treatment
    async updateTreatmentUseCase(id: string, subTreatments: ISubTreatment[]): Promise<{ treatment: ITreatment | null, message: string }> {
        try {
            const result = await updateTreatmentFn(id, subTreatments, this.adminRepository)
            return result
        } catch (error: any) {
            throw (error)
        }
    }

    //get Treatment
    async getTreatmentUsecase(req: Req, next: Next): Promise<ITreatment[] | void> {
        try {
            const result = await getTreatmentFn(req, this.adminRepository, next)
            if (result) return result
        } catch (error: any) {
            catchError(error, next)
        }
    }

    async findTreatmentUseCase(id: string, next: Next): Promise<ITreatment | void> {
        try {
            const result = await findTreatmentFn(id, this.adminRepository, next)
            return result
        } catch (error: any) {
            catchError(error, next)
        }
    }

    //treatment status change
    async trtmntStsUseCase(id: string): Promise<ITreatment | void> {
        try {
            return await trtmntStsFn(this.adminRepository, id)
        } catch (err: any) {
            throw (err)
        }
    }

    //delete subtreatment
    async deleteSubTrtmntUseCase(id: string, subName: string): Promise<ITreatment | void> {
        try {
            const result = await rmvSubTrtmntFn(id, subName, this.adminRepository)
            return result
        } catch (error: any) {
            throw (error)
        }
    }

    // --------------------------------------------------------------------------------------------------------doctor

    //add doctor
    async addDoctor({ name, email, mob, password, address, experience, doctor_id, treatment, subTreatment, amount }: IDoctor, next: NextFunction): Promise<void | { doctor: IDoctor; message?: string }> {
        try {
            const addDocResult = await addDoctor(this.doctorRepository, this.sendMail, { name, email, mob, password, address, experience, doctor_id, treatment, subTreatment, amount }, next)
            return addDocResult
        } catch (err: any) {
            catchError(err, next)
        }

    }

    // list or unlist doctor
    async listUnlstDoc(id: string, next: Next): Promise<string | void> {
        try {
            let result = await listUnlist(this.doctorRepository, id, next)
            return result
        } catch (err: any) {
            catchError(err, next)
        }
    }

    //verify doctor
    async verifyDoctor(id: string, next: Next): Promise<IDoctor | void> {
        try {
            const result = await verifDoctorFn(id, this.adminRepository, next)
            return result
        } catch (error: any) {
            catchError(error, next)
        }
    }

    //get doctors
    async getDoctorsUseCase(req: Req, next: Next): Promise<IDoctor[] | void> {
        try {
            let result = await getDoctorsFn(req, this.adminRepository, next)
            if (result) return result
        } catch (err: any) {
            catchError(err, next)
        }
    }

    // -----------------------------------------------------------------user 

    //block or unblock user
    async blockUser(id: string, next: Next): Promise<string | void> {
        try {
            let result = await block(this.userRepository, id, next)
            return result
        }
        catch (err: any) {
            catchError(err, next)
        }
    }

    //get users 
    async getUsersUsecase(page:number, next: Next): Promise<{users:Iuser[],totalUsers:number} | void> {
        try {
            const result = await getUsersFn(page, this.adminRepository, next)
            if (result) {
                return result
            }
        } catch (error: any) {
            catchError(error, next)
        }
    }


    //get dashData
    async getDashDataUseCase(req:Req,next:Next):Promise<object|void>{
        try {
            const result = await dashDataFn(req,this.userRepository,this.bookingRepository,this.doctorRepository)
            return result
        } catch (error) {
            catchError(error,next)
        }
    }


}