import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { IChatUseCase } from "../../useCase/interface/IntrfcUseCase/chatUseCase";
import ErrorHandler from "../../useCase/middleware/errorHandler";

export class ConversationController{

    private chatUseCase :IChatUseCase 
    constructor(chatUseCase:IChatUseCase){
        this.chatUseCase = chatUseCase
    }

    async conversation(req:Req,res:Res,next:Next){
        try{
            const{senderId,receiverId}:{ senderId:string ,receiverId:string}= req.body
             await this.chatUseCase.conversationUseCase(senderId,receiverId,next)
            res.status(200).json({senderId,receiverId})
        }catch(error){
            next (new ErrorHandler(500,error as Error))
        }
    }

    //get conversation
    async getConversation(req:Req,res:Res,next:Next){
        try {
            const userId:string = req.params.userId
            const result = await this.chatUseCase.getConversationUseCase(userId,next)
            res.status(200).json(result)
        } catch (error) {
            next (new ErrorHandler(500,error as Error))
        }
    }

    //get conv includes two userId
    async getConversations(req:Req,res:Res,next:Next){
        try {
            const  firstId:string=req.params.firstId 
            const secondId:string=req.params.secondId;
            const result = await this.chatUseCase.getconversationsUseCase(firstId,secondId,next)
            res.status(200).json(result)
        } catch (error) {
            next(new ErrorHandler(500,error as Error))
        }
    }
}