import adminModel from "../../models/adminModel";

export const findAdminByEmail = async (email:string,adminModels:typeof adminModel)=>{
    const  adminData = await adminModels.findOne({email})
    return adminData
}