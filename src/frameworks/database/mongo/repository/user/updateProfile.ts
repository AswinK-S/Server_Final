import { Iuser } from "../../../../../entity/userEntity";
import userModel from "../../models/userModel";

export const updateProfile =async(name:string,email:string,mob:string,id:string,userModels:typeof userModel):Promise<Iuser|void>=>{
    try {
        const mobile:number = Number(mob)
        const result = await userModels.findByIdAndUpdate({_id:id},{$set:{name, email, mob:mobile }}, {new:true})
        if(result){
            result.password=''
            return result
        }
    } catch (error) {
        throw(error as Error)
    }
}