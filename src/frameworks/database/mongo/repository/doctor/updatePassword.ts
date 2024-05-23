import doctorModel from "../../models/doctorModel"

export const updatePassword = async(id:string,hashedPassword:string,doctorModels :typeof doctorModel)=>{
    try {
        const result = await doctorModels.findByIdAndUpdate({_id:id},{$set:{password: hashedPassword}},{new:true})
        return result
    } catch (error) {
        throw (error as Error)
    }
}