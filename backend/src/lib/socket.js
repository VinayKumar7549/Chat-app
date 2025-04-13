// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors:{
//         origin: ["http://localhost:5173"]
//     },
// });

// export function getReciverSocketId(userId) {
//     return userSocketMap[userId]
// }

// //used to store online users
// const userSocketMap = {};  // { userId: socketId}

// io.on("connection", (socket) => {
//     console.log("a new client connected", socket.id);

//     const userId = socket.handshake.query.userId
//     if(userId) userSocketMap[userId] = socket.id

//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", () => {
//         console.log("a user disconnected", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     })
// })

// export { io, app, server};

import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Express CORS middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Socket.IO configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling']
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: true
    }
});

export function getReciverSocketId(userId) {
    return userSocketMap[userId];
}

const userSocketMap = {};  // { userId: socketId }

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} connected with socket ${socket.id}`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });

    // Error handling
    socket.on("error", (err) => {
        console.error("Socket error:", err);
    });
});

export { io, app, server };