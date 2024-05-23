import doctorModel from "../../models/doctorModel"

export const lstUnlstDoc = async (id:string):Promise<string>=>{
    try{
        let docData = await doctorModel.findById({_id:id})
        let result:string=''

        if(docData?.status ===true){
            await doctorModel.findByIdAndUpdate({_id:id}, {$set:{status:false}})
            
            result = 'Doctor has been unlisted'
        }else{
            await doctorModel.findByIdAndUpdate({_id:id},{$set:{status:true}})
            result ='Doctor has been listed'
        }
        return result
    }catch(err:any){
        throw (err)
    }
}