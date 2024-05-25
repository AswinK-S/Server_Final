require('dotenv').config()
import app from "./frameworks/webserver/config/app";
import connectDb from "./frameworks/webserver/config/db";
import http from 'http'
import { Server } from 'socket.io'
import SocketServer from "./socket/socket";

const port =3000
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: 'https://srd-ayurveda-client-side.vercel.app/',
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
        // socket(server)
    })
}

start()