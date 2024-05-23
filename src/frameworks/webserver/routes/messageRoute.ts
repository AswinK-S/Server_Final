import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { messageController } from "./injections/injuction";
import { multerMid } from "../../middlewares/multer";
import {setFileLimit}from "../../middlewares/multer"

export function messageRoute(router:Route){
    
    router.post('/',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        messageController.postMessage(req,res,next)
    }))

    router.get('/getMessages/:converSationId',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        messageController.getMessage(req,res,next)
    }))

    router.post('/sendMedia',multerMid.single('medias'),setFileLimit,catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        messageController.saveMediaToCloudinary(req,res,next)
    }))

    //save chat media to db
    router.post('/storeMedia',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        messageController.storeMediaToDb(req,res,next)
    }))

    return router
}