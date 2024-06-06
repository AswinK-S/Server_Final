import dotenv from 'dotenv'
dotenv.config();

import app from "./frameworks/webserver/config/app";
import connectDb from "./frameworks/webserver/config/db";
import http from 'http'
import { Server } from 'socket.io'
import SocketServer from "./socket/socket";



const port =3000
const server = http.createServer(app)
const corsOrigin:string = process.env.CORS_ORIGIN as string
const corsOrigin2:string = process.env.CORS_ORIGIN2 as string
const corsOrigin1:string = process.env.CORS_ORIGIN1 as string

const io = new Server(server, {
    cors: {
      origin:[corsOrigin,corsOrigin2,corsOrigin1],
      credentials: true,
      methods: ['GET', 'POST'],
      optionsSuccessStatus: 204,
    },
  });

SocketServer(io)

const start = ()=>{
    server.listen(port,()=>{
        console.log(`server started on http://localhost:${port}`);
        connectDb()
    })
}

start()