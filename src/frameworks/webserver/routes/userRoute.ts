import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { resendOtpController, userController } from "./injections/injuction";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { multerMid, setFileLimit } from "../../middlewares/multer";
import { authMiddleware } from "../../middlewares/userAuth";

export function userRoute(router:Route){

    //treatment Route 
    router.get('/userTreatments',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.treatments(req,res,next)
    }))

    //signup Route
    router.post('/signup',catchAsyncErrors((req: Req, res: Res, next: Next)=>{
        userController.registerUser(req,res,next)
    }))

    // googleAuthSignUp
    router.post('/googleSignUp',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.googleSignUP(req,res,next)
    }))

  
    //resend otp
    router.post('/resendOtp',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        resendOtpController.resendOtp(req,res,next)
    }))

    //create user
    router.post('/create_user',catchAsyncErrors((req:   Req,res:Res,next:Next)=>{
        userController.createUser(req,res,next)
    }))

    //login Route
    router.post('/login',authMiddleware,catchAsyncErrors((req:Req,res:Res ,next:Next)=>{
        userController.login(req,res,next)
    }))

    //verify email for forgot password
    router.post('/verifyEmail',authMiddleware,catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.verifyEmail(req,res,next)
    }))

    //submit otp for forgot password
    router.post('/submitOtp',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.verifyOtp(req,res,next)
    }))

    //update password for forgot password functonality
    router.patch('/update-password',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.updatePassword(req,res,next)
    }))

    //change password
    router.patch('/changePassword',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.changePassword(req,res,next)
    }))

    //profile image upload
    router.post('/proImageUpload',multerMid.single('image'),setFileLimit,catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.profileImage(req,res,next)
    }))
    
    //update userProfile
    router.patch('/updateProfile',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.updateProfile(req,res,next)
    }))

    //get doctor according to the sub Treatment
    router.get('/doctor/:id/:date',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.getDoctorForTrtmnt(req,res,next)
    }))
    
    // get all bookings for user 
    router.get('/bookings/:email/:page/:pageSize',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.getBookingDetails(req,res,next)
    }))

    //get booking details
    router.get('/bookingDetails',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.getBookingDtls(req,res,next)
    }))

     //payment
     router.post('/payment',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.makePayment(req,res,next)
    }))

    //webhook payment
    router.post('/webHookPayment',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('web hook');
        userController.paymentWebHook(req,res,next)
    }))

     //cancel booking
     router.put('/canceBooking/:id/:amount',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.cancelBooking(req,res,next)
    }))

    //get doctors list from booking
    router.get('/doctors',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.getDoctorsForChat(req,res,next)
    }))

     //get users list from booking
     router.get('/getUsers/:docId',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.getUsersForChat(req,res,next)
    }))

    router.get('/prescritpion',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.prescriptionPdf(req,res,next)
    }))
   

    return router

   
}