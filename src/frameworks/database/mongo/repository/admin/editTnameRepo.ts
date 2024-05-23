import treatmentModel from "../../models/treatmentModel"

export const editTnameRepo = async(name:string,id:string,treatmentModels:typeof treatmentModel)=>{
    try {
        const result = await treatmentModels.findByIdAndUpdate({_id:id},{$set:{name:name}},{new:true})
        return result
    } catch (error) {
        throw (error as Error)
    }
}