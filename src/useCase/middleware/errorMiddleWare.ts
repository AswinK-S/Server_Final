import { Req,Res,Next } from "../../frameworks/types/serverPackageTypes";
import ErrorResponse from "./errorHandler";

export const errorMiddleware =(err:any , req:Req, res:Res, next:Next) =>{
    err.statusCode = err.statusCode || 500
    const message:string = err.message || 'internal server error'
  
      if (err.name === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorResponse(400, message);
      }

    
    
    if(message ==="unknown error"){
      res.status(400).json({
        success:false,
        message:'something went wrong please try after sometime'
      });
      return
    }

      res.status(err.statusCode).json({
        success:false,
        message:message
      });
} 