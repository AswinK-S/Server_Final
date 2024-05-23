import doctorModel from "../../models/doctorModel";

export const findDoctorByEmail = async(email:string,doctorModels:typeof doctorModel)=>{
    try{
        let result = await doctorModels.findOne({email}).select("+password")
        return result
    }catch(err:any){
        throw (err)
    }
}   