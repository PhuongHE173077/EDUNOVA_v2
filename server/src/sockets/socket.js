import { Server } from "socket.io";
import http from "http";

import express from "express";
import { corsOptions } from "~/config/cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);


    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

export { io, app, server };