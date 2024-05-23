import userModel from "../models/userModel";
import { IUserRepository } from "../../../../useCase/interface/repositoryIntrfce/userRepoIntfc";
import { Iuser } from "../../../../entity/userEntity";

import {
    findUserByEmail,
    createUser,
    blckUsrRepo,
    getDoctorForTrtmnt,
    bookingDtlRepo,
    updatePassword,
    bookings,
    getUserInfo,
    getDoctors,
    getUsers,
    changePassword,
    uploadProImg,
    updateProfile,
    getUsersData
} from './user/index'

import doctorModel from "../models/doctorModel";
import slotModel from "../models/slot";
import { DoctorWithSlots } from "../../../../entity/doctorWithSlots";
import { IBookingDetail } from "../../../../entity/bookingDtl";
import treatmentModel from "../models/treatmentModel";
import bookingModel from "../models/booking";
import { ITransformedBooking } from "../../../../entity/transformedBooking";
import { IDoctor } from "../../../../entity/doctorEntity";
import { Req } from "../../../types/serverPackageTypes";
export class UserRepository implements IUserRepository {

    constructor(private userModels: typeof userModel, private doctorModels: typeof doctorModel, private slotModels: typeof slotModel,
        private treatmentModels: typeof treatmentModel,private bookingModels: typeof bookingModel
    ) { }

    //check the user exists
    async findUsersByEmail(email: string): Promise<Iuser | null> {
        try {
            const userExist = await findUserByEmail(email, this.userModels)
            return userExist
        } catch (error) {
            throw (error as Error)
        }
    }

    //createUser
    async createUser(newUser: Iuser): Promise<Iuser> {
        try {
            return await createUser(newUser, this.userModels)

        } catch (error) {
            throw (error as Error)
        }
    }

    //updating password for forgot password
    async updatePasswordRepo(password:string,email:string):Promise<Iuser|void>{
        try {
            const result = await updatePassword(password,email,this.userModels)
            return  result
        } catch (error) {
            throw (error as Error)
        }
    }

    //change password
    async changePasswordRepo(id:string,password:string):Promise<any>{
        try {
            const result = await changePassword(id,password,this.userModels)
            return result
        } catch (error) {
            throw(error as Error)
        }
    }

    //upload profile image
    async uploadProfileImgRepo(imageRslt:string,id:string):Promise<Iuser|void>{
        try{
            const result = await uploadProImg(imageRslt,id,this.userModels)
            return result
        }catch(error){
            throw(error as Error)
        }
    }
    
    //update profile
    async updateProfileRepo(name:string,email:string,mob:string,id:string):Promise<Iuser|void>{
        try {
            const result = await updateProfile(name,email,mob,id,this.userModels)
            return result
        } catch (error) {
            throw(error as Error)
        }
    }

    //block or unblock user its for admin
    async blockUser(id: string): Promise<string> {
        try {
            return await blckUsrRepo(id)

        } catch (error) {
            throw (error as Error)
        }
    }

    //get user info for chat 
    async getUserInfoRepo(userId:string):Promise<Iuser|void>{
        try {
            const result = await getUserInfo(userId,this.userModels)
            return result
        } catch (error) {
           throw (error as Error) 
        }
    }


    //get doctors for treatment booking
    async getDoctorsforTrtmntRepo(id: string, date: string): Promise<{ doctor: DoctorWithSlots[], message: string } | void> {
        try {
            const result = await getDoctorForTrtmnt(id, date, this.doctorModels, this.slotModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    // get all the bookings detail for user 
    async getBookingDetailsRepo(page:number, email:string,pageSize:number):Promise<ITransformedBooking[]|void>{
        try {
            const result = await bookings(page,email,pageSize,this.bookingModels,this.doctorModels,this.treatmentModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    //get the details for booking
    async bookingDtlsRepo(treatmentId: string, subTrtmntId: string, docId: string): Promise<Partial<IBookingDetail> | void> {
        try {
            const result = await bookingDtlRepo(treatmentId, subTrtmntId, docId, this.treatmentModels, this.doctorModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    //get the doctors for the chat 
    async getDoctorsDetailsRepo(email:string):Promise<IDoctor[]|void>{
        try {
            const result = await getDoctors(email,this.bookingModels,this.doctorModels)
            return result
        } catch (error) {
            throw (error as Error)
        }
    }

    //get the users for chat 
    async getUsersRepo (docId:string):Promise<Iuser[]|void>{
        try {
          const result = await getUsers(docId,this.bookingModels,this.userModels)
          return result  
        } catch (error) {
            throw (error as Error)
        }
    }

    //get users data for admin
    async getUsersDataRepo(req:Req):Promise<object>{
        try {
         const result = await getUsersData(req,this.userModels)
         return result
        } catch (error) {
            throw (error as Error)
        }
    }

}
