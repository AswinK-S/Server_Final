import express,{ Express,NextFunction,Request,Response } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { errorMiddleware } from "../../../useCase/middleware/errorMiddleWare";



// Routes
import { userRoute } from "../routes/userRoute";
import { adminRoute } from "../routes/adminRoute";
import { doctorRoute } from "../routes/doctorRoute";
import { conversationRoute } from "../routes/conversationRoute";
import { messageRoute } from "../routes/messageRoute";


const app: Express = express()

app.use(express.urlencoded({extended:true,limit: '20mb'}))
app.use(express.json({ limit: '20mb' }))

app.use(cookieParser())




const corsOrigin:string = process.env.CORS_ORIGIN as string
const corsOrigin1:string = process.env.CORS_ORIGIN1 as string
const corsOrigin2:string = process.env.CORS_ORIGIN2 as string

//cors setup
app.use(cors({
    origin:[corsOrigin,corsOrigin1,corsOrigin2],
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    optionsSuccessStatus:204    
}))


app.use('/user',userRoute(express.Router()))
app.use('/admin',adminRoute(express.Router()))
app.use('/doctor',doctorRoute(express.Router()))
app.use('/conversation',conversationRoute(express.Router()))
app.use('/message',messageRoute(express.Router()))

// unknown url
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`route ${req.originalUrl} isn't found`) as any;
    error.statusCode = 404;
    next(error);
  });
  
app.use(errorMiddleware)

export default app