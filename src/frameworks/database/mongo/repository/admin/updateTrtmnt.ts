import treatmentModel from "../../models/treatmentModel";
import { ISubTreatment } from "../../../../../entity/subTrtmnt";
import { ITreatment } from "../../../../../entity/treatmentEntity";


export const updateTreatmentRepo = async(id:string,subTrtments:ISubTreatment[],treatmentModels: typeof treatmentModel)=>{
    try{

        let treatment:ITreatment |null ;
        let message:string='';
        const trt = await treatmentModel.findOne({_id:id})
        // check whether the subTrtments.length is more than five
        if(trt){
            if(trt?.subTreatments.length + subTrtments.length >5){
             
                return{
                    treatment:trt,
                    message:'cannot add more  than five!'
                }
            }
        }
       
        
         const result = await treatmentModels.findOneAndUpdate(
            { _id: id },
            {
              $push: {
                subTreatments: { $each: subTrtments.map(item => ({ name: item.name })) }
              }
            },
            {new:true}
          );
          return{
            treatment:result || null ,
            message:'success'
          }
    }catch(error:any){
        throw (error)
    }
}