import doctorModel from "../../models/doctorModel";

export const getDoctorsData = async(doctorModels:typeof doctorModel):Promise<object>=>{
    try {
        const result = await doctorModels.aggregate([
            {
                $group:{
                    _id:null,
                    totalDoc:{$sum:1},
                    approvedDoc:{$sum:{$cond:[{$eq:["$status",true]},1,0]}}
                }
            }
        ])
        const {totalDoc,approvedDoc}:{totalDoc:number;approvedDoc:number} =result[0]
        return {doctors:{totalDoc,approvedDoc}}

    } catch (error) {
        throw(error as Error)
    }
}