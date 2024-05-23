import { Iuser } from "../../../../../entity/userEntity";
// import { UpdateOneResult } from "../../../../../entity/updatePsswrdEntity";
import userModel from "../../models/userModel";

export const changePassword = async(id:string,password:string,userModels:typeof userModel):Promise<any>=>{
    try {

        const result = await userModels.findOneAndUpdate({_id:id},{$set:{password:password}},{new:true})     
        if(result){
            result.password=''
            return result
        } 
        
    } catch (error) {
        throw (error as Error)
    }
}