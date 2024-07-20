import { Iuser } from "../../../../../entity/userEntity";
import userModel from "../../models/userModel";


export const userAuth =async(email:string,userModels:typeof userModel):Promise<Iuser|void>=>{
    try {
        const result = await userModels.findOne({email:email})
        if(result)return result

    } catch (error) {
       throw(error as Error)
    }
}