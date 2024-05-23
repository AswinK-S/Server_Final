import bookingModel from "../../models/booking";

export const getBookingsData = async(bookingsModels:typeof bookingModel):Promise<object>=>{
    try {
        const result = await bookingsModels.aggregate([
            {
                $group:{
                    _id:null,
                    totalBooking:{$sum:1},
                    pending:{$sum:{$cond:[{$eq:["$status","Pending"]},1,0]}},
                    completed:{$sum:{$cond:[{$eq:['$status','Consulted']},1,0]}},
                    cancelled:{$sum:{$cond:[{$eq:['$status','Cancelled']},1,0]}}
                }
            }
        ])
        const {totalBooking,pending,completed,cancelled}:{totalBooking:number,pending:number,completed:number,cancelled:number}=result[0]
        return {bookings:{totalBooking,pending,completed,cancelled}}
    } catch (error) {
       throw(error as Error) 
    }
}