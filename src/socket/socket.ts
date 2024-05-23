import { Server } from 'socket.io'

const SocketServer = (server: any) => {


    interface User {
        userId: string;
        socketId: string;
        online?:boolean
    }

    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
            methods: ['GET', 'POST'],
            optionsSuccessStatus: 204

        }
    })

    let users: User[] = []

    io.on("connection", (socket) => {
        io.emit("welcome", "this is socket server")
        socket.on('addUser', (userId) => {
            addUser(userId, socket.id)
            io.emit("getUsers", users)//getUsers
        })

        const getUser = (userId: string) => {
            return users.find((user) => user.userId === userId)
        }

        //send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text,media,timestamp}) => {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", { senderId, text,media,timestamp});
            }else{
                console.log('no user');
            }
        });

        //disconnect user
        socket.on('disconnectUser', () => {
            removeUser(socket.id)
            io.emit("getUsers", users)
        })

    })


    const addUser = (userId: string, socketId: string) => {
        const existingUser = users.find(user => user.userId === userId);
        if (existingUser) {
            existingUser.socketId = socketId;
            existingUser.online = true;
        } else {
            users.push({ userId, socketId, online: true });
        }
        io.emit("usersOnline", users.filter(user => user.online));
    };

    const removeUser = (socketId: string) => {
        users = users.filter((user) => user.socketId !== socketId)
        io.emit("usersOnline", users.filter(user => user.online));

    }

   
    
    io.listen(3001)
    return io
}

export default SocketServer; 