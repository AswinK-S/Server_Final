import { IDoctor } from "../../../entity/doctorEntity";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";
import ErrorHandler from "../../middleware/errorHandler";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IHashPassword } from "../../interface/services/hashPassword";
import { ITreatment } from "../../../entity/treatmentEntity";
import { ISendMail } from "../../interface/services/sendMail";


export const  addDoctor =async(
    doctorRepository:IDoctorRepository,
    sendMail:ISendMail,
    { name, email, mob, password, address, experience, doctor_id, treatment,subTreatment,amount }:
      {name:string,email:string,mob:number,password:string | Promise<string >,address:string,experience:string,doctor_id:string,treatment:string,subTreatment:string,amount:number} ,
    next:Next
    )=>{
        try{
            const isDocExistInEmail = await doctorRepository.isDoctorExist(email)

            if(isDocExistInEmail ==='doctor not exist in this email'){
                const isDoctorExistInMob = await doctorRepository.isDocExistInMob(mob)
                if(isDoctorExistInMob ==='doctor not exist in this mobile'){
                    const result = await doctorRepository.addDoctor({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment,amount})
                    
                    //send email to doctor
                    const emailRes = await sendMail.sendMailToDoc(email,password as string)
                    if(emailRes.success){
                        return{doctor:result,message:'mail send to doctor ,added new doctor'}
                    }    

                }

            }
            
        }catch(err:any){
            return next (new ErrorHandler(500,err.message))
        }
    }