import { IBookingDetail } from "../../../entity/bookingDtl";
import { IDoctor } from "../../../entity/doctorEntity";
import { DoctorWithSlots } from "../../../entity/doctorWithSlots";
import { ITransformedBooking } from "../../../entity/transformedBooking";
import { Iuser } from "../../../entity/userEntity";
import { Req } from "../../../frameworks/types/serverPackageTypes";

export interface  IUserRepository {
    
    findUsersByEmail(email:String): Promise<Iuser | null >
    createUser(newUser: Iuser): Promise<Iuser>;
    blockUser(id:string):Promise<string>
    getUserInfoRepo(userId:string):Promise<Iuser|void>
    getDoctorsforTrtmntRepo(id:string,date:string):Promise<{doctor:DoctorWithSlots[],message:string}|void>
    bookingDtlsRepo(treatmentId:string,subTrtmntId:string,docId:string):Promise<Partial<IBookingDetail>|void>
    updatePasswordRepo(password:string,email:string):Promise<Iuser|void>
    getBookingDetailsRepo(page:number, email:string,pageSize:number):Promise<ITransformedBooking[]|void>
    getDoctorsDetailsRepo(email:string):Promise<IDoctor[]|void>
    getUsersRepo (docId:string):Promise<Iuser[]|void>
    changePasswordRepo(id:string,password:string):Promise<any>
    uploadProfileImgRepo(imageRslt:string,id:string):Promise<Iuser|void>
    updateProfileRepo(name:string,email:string,mob:string,id:string):Promise<Iuser|void>

    //get users data for admin
    getUsersDataRepo(req:Req):Promise<object>
}