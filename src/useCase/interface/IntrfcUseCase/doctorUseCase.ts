import { IBooking } from "../../../entity/booking";
import { IDoctor } from "../../../entity/doctorEntity";
import { overview } from "../../../entity/overView";
import { IPatients } from "../../../entity/patientsForDoc";
import { Query } from "../../../entity/query";
import { ISlot } from "../../../entity/slotEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";

export interface IDoctorUseCase {

    // login
    login({email,password}:{email:string;password:string},next:Next):Promise<{doctor:IDoctor;token:IToken} | void >
    uploadProfileImage(image:any,id:string,next:Next):Promise<any >
    updateProfileUseCase (id:string,query:Query,next:Next):Promise<IDoctor|void>
    uploadDoc(image:any,id:string,next:Next):Promise<any|IDoctor>
    getDocDetailUseCase (id:string,next:Next):Promise<IDoctor|void>
    create_slot (selectedShift:string,value:string,id:string,next:Next):Promise<{slot:ISlot[],message:string}|void|{message:string}>
    get_slots(id:string,pageNumber:number,pageSize:number,next:Next):Promise<{slot:ISlot[],message:string}|void>
    //get otp to change the password
    changePasswordUseCase(name:string,email:string,next:Next):Promise<string|void>
    //verify otp to change  the password
    verifyOtpUseCase(email:string,otp:string,next:Next):Promise<string|void>
    //update password
    updatePasswordUseCase(id:string,password:string,next:Next):Promise<IDoctor|void>
    //get patients Detail
    getPatientsUseCase(id:string,limit:number,page:number,next:Next):Promise<IPatients[]|void>
    //get patients count for overview
    getOverviewUseCase(id: string, next: Next): Promise<overview | void>

    //consultation confirmation 
    confirmConsultationUseCase(docId:string,bookingId:string,next:Next):Promise<IBooking|void>
}

