import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { conversationcontroller, userController } from "./injections/injuction";

export function conversationRoute(router:Route){

    router.post('/',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        conversationcontroller.conversation(req,res,next)
    }))

    //get conversation
    router.get('/getConversation/:userId',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        conversationcontroller.getConversation(req,res,next)
    }))

    //get userData 
    router.get('/getUserInfo/:userId',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        userController.getUserInfo(req,res,next)
    }))

    //get conv includes two userIds
    router.get('/getConversations/:firstId/:secondId',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        conversationcontroller.getConversations(req,res,next)
    }))

    return router
}