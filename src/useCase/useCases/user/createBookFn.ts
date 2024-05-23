import { IBookingRepository } from "../../interface/repositoryIntrfce/bookingRepository"

export const createBookingFn = async(bookingData:any,chargeId:string,bookingRepository:IBookingRepository):Promise<any>=>{
    try{
        const {
            amount,email,treatmentName,doctorId,treatmentId,subTreatmentId,consultingDate
            }:{
              amount:number,email:string,treatmentName:string,doctorId:string,treatmentId:string,subTreatmentId:string,consultingDate:string
            } = bookingData
            const date: Date = new Date(consultingDate)

            const result = await bookingRepository.createBookingRepo(amount, email, doctorId,treatmentId,subTreatmentId,date,chargeId)
            return result
    }catch(error){
        throw (error as Error)
    }
}