import userModel from "../../models/userModel";
import { Req } from "../../../../types/serverPackageTypes";

export const getUsersRepo = async(page:number,userModels:typeof userModel)=>{

    try{

        const pageSize:number =  8
        const skip:number = (page - 1) * pageSize;

        const  result = await userModels.find({}).skip(skip).limit(pageSize);
        const totalUsersCount = await userModels.countDocuments();

        return {users:result,totalUsers:totalUsersCount};
    }catch(err){
        throw (err as Error)
    }
}