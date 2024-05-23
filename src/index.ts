require('dotenv').config()
import app from "./frameworks/webserver/config/app";
import connectDb from "./frameworks/webserver/config/db";
import socket  from './socket/socket'
import http from 'http'

const port =3000
const server = http.createServer(app)

const start = ()=>{
    app.listen(port,()=>{
        console.log(`server started on http://localhost:${port}`);
        connectDb()
        socket(server)
    })
}

start()