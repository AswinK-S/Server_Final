import { Req } from "../../../frameworks/types/serverPackageTypes"
import { IBookingRepository } from "../../interface/repositoryIntrfce/bookingRepository"
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo"
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc"

export const dashDataFn = async(req:Req,userRepository:IUserRepository,bookingRepository:IBookingRepository,doctorRepository:IDoctorRepository):Promise<object|void>=>{
    try {
       const userData = await userRepository.getUsersDataRepo(req)
       const doctorData = await doctorRepository.getDoctorsDataRepo(req)
       const bookingData = await bookingRepository.getBookingsDataRepo(req)
       return {userData,doctorData,bookingData}
    } catch (error) {
        throw(error as Error)
    }
}