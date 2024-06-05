import bookingModel from "../../models/booking"
import prescriptionModel from "../../models/prescriptionModel"
import userModel from "../../models/userModel"

export const addPrescription = async (prescription: string, docId: string, bookingId: string,userEmail:string, 
    prescriptionModels: typeof prescriptionModel, userModels: typeof userModel,bookingModels:typeof bookingModel)
:Promise<void|{message:string}> => {
    try {
        const date: Date = new Date()
        const newPrescription = await prescriptionModels.create({
            date,
            doctorId: docId,
            userEmail: userEmail,
            notes: prescription
        })
        if (newPrescription) {
            const user =await  userModels.findOneAndUpdate(
                { email: userEmail },
                {$push:{prescriptions:newPrescription?._id}},
                {new:true}
            )
            const booking =await bookingModels.findOneAndUpdate({_id:bookingId},{prescriptions:newPrescription?._id},{new:true})
            if(!user){
                return {message:'There is no Patient'}
            }
            if(user && booking){
            return {message:'Prescription added'}
            }
        }

    } catch (error) {
        throw (error as Error)
    }
}