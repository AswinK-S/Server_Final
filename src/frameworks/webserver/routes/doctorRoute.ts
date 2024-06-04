import { Next, Req, Res, Route } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import {  doctorController, getOtpController, updatePasswordController, verifyOtpController } from "./injections/injuction"; 
import { multerMid } from "../../middlewares/multer";

export function doctorRoute(router:Route){

    // login
    router.post('/login',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.doclogin(req,res,next)
    }))

    //get doctor details
    router.get('/getDetail/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.getDoctor(req,res,next)
    }))

    //get otp to changePassword 
    router.post('/changePassword',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        getOtpController.changePassword(req,res,next)
    }))
    
    //verifyOtp to change password
    router.post('/verifyOtp',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('in routr');
        verifyOtpController.verifyOtp(req,res,next);
    
    }))

    //update password 
    router.patch('/updatePassword',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        updatePasswordController.updatePassword(req,res,next)

    }))

    //image upload
    router.post('/image',multerMid.single('image'),catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.profileImg(req,res,next)
    }))

    //docment upload
    router.post('/document',multerMid.single('image'),catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.uploadDoc(req,res,next)
    }))

    //post doctor details
    router.post('/details',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.doctorDetails(req,res,next)
    }))

    //post doctor slot creation
    router.post('/createSlot',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.createSlot(req,res,next)
    }))

    //get docotor slots
    router.get('/getSlots/:id/:pageNumber/:pageSize',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.getSlots(req,res,next)

    }))

    //get patients
    router.get('/getDocPatients',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.getPatients(req,res,next)
    }))

    //get data for overview
    router.get('/overview',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.getOverview(req,res,next)
    }))

    //confirm patient consultation
    router.post('/confirmC',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.confirmConsultation(req,res,next)
    }))

    //add prescription
    router.post('/addPres',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.addPrescription(req,res,next)
    }))

    return router
}