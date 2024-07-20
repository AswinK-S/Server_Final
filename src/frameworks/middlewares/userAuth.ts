// import { IUserRepository } from "../../useCase/interface/repositoryIntrfce/userRepoIntfc";
import { Next, Req, Res } from "../types/serverPackageTypes";
import { UserRepository } from "../database/mongo/repository/userRepository";
import bookingModel from "../database/mongo/models/booking";
import treatmentModel from "../database/mongo/models/treatmentModel";
import slotModel from "../database/mongo/models/slot";
import doctorModel from "../database/mongo/models/doctorModel";
import userModel from "../database/mongo/models/userModel";

const userRepo = new UserRepository( 
    userModel, 
    doctorModel,  
    slotModel,
    treatmentModel, 
    bookingModel)

    
//checking user is blocked or not
export const authMiddleware =async (req:Req,res:Res,next:Next)=>{
    try {
       
        const {email}:{email:string} =req.body

        const user =await userRepo.checkUserAuthRepo(email)
        if(user?.status===false){
           
            return res.status(401).json({ message: 'You are blocked by admin!' });
        }
        next()
    } catch (error) {
        console.error('Error in protect middleware:', error);
        return res.status(401).json({ message: 'error in userAuth middleware' }) 
    }
}