import { IDoctor } from "../../../../../entity/doctorEntity";
import { DoctorWithSlots } from "../../../../../entity/doctorWithSlots";
import doctorModel from "../../models/doctorModel";
import slotModel from "../../models/slot";

export const getDoctorForTrtmnt = async(id:string,date:string,doctorModels:typeof doctorModel,slotModels:typeof slotModel):Promise<{doctor:DoctorWithSlots[],message:string}|void>=>{
    try {

        const selectedDate:Date = new Date(date)

        const doctors= await doctorModels.find({subTreatment:id})

        const doctorsWithSlot = await Promise.all(doctors.map(async(doctor)=>{
            const slots = await slotModels.find({date:selectedDate,doctorId:doctor._id})
            return {doctor,slots}
        }))

        doctorsWithSlot.forEach((item)=>{
            item.doctor.password=''
        })
       
        return { doctor: doctorsWithSlot, message: 'Doctors with slots retrieved successfully' };    
      
    } catch (error) {
        throw (error as Error)
    }
}