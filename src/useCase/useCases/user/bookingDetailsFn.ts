import { IBookingDetail } from "../../../entity/bookingDtl";
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";

export const getBookingDetailsFn = async(trtmntId:string,sbTrtmntId:string,docId:string,userRepsitory: IUserRepository):Promise<Partial<IBookingDetail>|void>=>{
    try {
        const result = await userRepsitory.bookingDtlsRepo(trtmntId,sbTrtmntId,docId)
        return result
    } catch (error) {
        throw (error as Error)
    }
}