import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { IChatUseCase } from "../../useCase/interface/IntrfcUseCase/chatUseCase";
import ErrorHandler from "../../useCase/middleware/errorHandler";

export class MessageController{
    private chatUseCase:IChatUseCase
    constructor(chatUseCase:IChatUseCase){
        this.chatUseCase = chatUseCase
    }

    async postMessage(req:Req,res:Res,next:Next){
        try {
            const {conversationId,sender,text}:{ conversationId:string,sender:string,text:string}= req.body
            const result = await this.chatUseCase.messageUseCase(conversationId,sender,text,next)
            res.status(200).json(result)
        } catch (error) {
            next (new ErrorHandler(501,error as Error))
        }
    }

    async getMessage(req:Req,res:Res,next:Next){
        try {
            const conversationId:string = req.params.converSationId
            const result = await this.chatUseCase.getMessageUseCase(conversationId,next)
            res.status(200).send(result)
        } catch (error) {
            next (new ErrorHandler(500,error as Error ))
        }
    }

    //upload chat  media to clodinary
    async saveMediaToCloudinary(req:Req,res:Res,next:Next){
        try {
            const media:any = req.file
            const result = await this.chatUseCase.uploadMediaUseCase(media,next)
            res.status(200).json(result)
        } catch (error) {
            next (new ErrorHandler(500,error as Error).message)
        }
    }

    //store message media to db
    async storeMediaToDb(req:Req,res:Res,next:Next){
        try{
            const {conversationId,sender,mediaUrl}:{ conversationId:string,sender:string,mediaUrl:string}= req.body
            const result = await this.chatUseCase.messageMediaUseCase(conversationId,sender,mediaUrl,next)
            res.status(200).json(result)
        }catch(error){
            next(new ErrorHandler(500,error as Error).message)
        }
    }

}