import { Iuser } from "../../../../../entity/userEntity";
import userModel from "../../models/userModel";

export const uploadProImg = async(imageRslt:string,id:string,userModels:typeof userModel):Promise<Iuser|void>=>{
    try {
         const result = await userModels.findOneAndUpdate({_id:id},{$set:{image:imageRslt}},{$upsert:true,new:true})
         if(result) {
            result.password=''
            return result
        }
    } catch (error) {
        throw (error as Error)
    }
}