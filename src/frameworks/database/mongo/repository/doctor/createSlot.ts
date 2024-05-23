import { IDoctor } from "../../../../../entity/doctorEntity";
import { ISlot } from "../../../../../entity/slotEntity"
import doctorModel from "../../models/doctorModel";
import slotModel from "../../models/slot";

export const createSlot = async (selectedShift: string, value: string, id: string, slotModels: typeof slotModel ,doctorModels: typeof doctorModel): Promise<{ slot: ISlot[], message: string } | void |{message:string}> => {
    try {
        const date: Date = new Date(value)
        const doctorId: string = id
        const shift: string = selectedShift
        let count: number = 0

        const doctor = await doctorModels.findOne({_id:doctorId})
        
        if (doctor?.isVerified === false){
            return {message:'Cannot create slot with out completing verification'}
        }


        const currentDate: string = new Date().toISOString().split('T')[0]
        const dateToCreateSlot: string = date.toISOString().split('T')[0]

        const dateLimitToCreateSlot: Date = new Date(currentDate)
        dateLimitToCreateSlot.setDate(dateLimitToCreateSlot.getDate() + 2)
        const limitDate: string = dateLimitToCreateSlot.toISOString().split('T')[0]

        //creat slot function
        const createSlot = async (doctorId: string, date: Date, shift: string): Promise<{ slot: ISlot[], message: string } | void> => {
            if (selectedShift === 'Morning Shift' || selectedShift == 'Afternoon Shift') {
                count = 6
            }

            else if (selectedShift == 'FullDay Shift') {

                count = 12
            }
            
            const newSlot = new slotModels({
                doctorId,
                date,
                shift,
                count
            });

            const result = await newSlot.save()

            const createdSltot = Array.isArray(result) ? result[0] : result
            return { slot: createdSltot, message: 'slot created' }
        }

        // find the slots 
        const isSlot = await slotModels.find({ doctorId: doctorId })

        //check the date is less than the current date
        if (dateToCreateSlot < currentDate) {
            return { slot: isSlot, message: 'You can not create the past date slot.' }
        }

        //check whethere the slot is creating on the same date
        if (dateToCreateSlot === currentDate) {
            return { slot: isSlot, message: 'Create slot before 1 day' }
        }

        
        if (isSlot.length > 0) {

            const isDateExist: [] | any = isSlot.filter((val) => val.date.toISOString().split('T')[0] === dateToCreateSlot)

            //check if slot exist in the same day
            if (isDateExist.length !== 0) {
                return { slot: isDateExist, message: "This date already has a slot." };
            }

            //check the date limit of adding slot
            if (dateToCreateSlot > limitDate) {
                return { slot: isSlot, message: 'Exceeded the date limit' }
            }

            const result =await createSlot(doctorId,date,shift)
            return result

        }
        
        //check the date limit of adding slot
        if (dateToCreateSlot > limitDate) {
            return { slot: isSlot, message: 'Exceeded the date limit' }
        }

        const result =await createSlot(doctorId,date,shift)
        return result

    } catch (error) {
        throw (error as Error)
    }
}