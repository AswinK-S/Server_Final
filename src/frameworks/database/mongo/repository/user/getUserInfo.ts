import { Iuser } from "../../../../../entity/userEntity"
import userModel from "../../models/userModel"

export const getUserInfo = async(userId:string,userModels:typeof userModel):Promise<Iuser|void>=>{
    try {
        const result = await userModels.findById({_id:userId})
        if(result){
        result.password=''
        return result
        }

    } catch (error) {
        throw(error as Error)
    }
}