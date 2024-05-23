import { Iuser } from "../../../../../entity/userEntity";
// import { UpdateOneResult } from "../../../../../entity/updatePsswrdEntity";
import userModel from "../../models/userModel";

export const updatePassword = async(password:string,email:string,userModels:typeof userModel):Promise<Iuser|void>=>{
    try {
        let updatedEmail =  email.replace(/"/g, '').trim()
       

        const res = await userModels.findOne({email:updatedEmail});
        const result = await userModels.findOneAndUpdate({email:updatedEmail},{$set:{password:password}},{new:true})
        if(result) return result
        
    } catch (error) {
        throw (error as Error)
    }
}