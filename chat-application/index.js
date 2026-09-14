const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const dotenv = require("dotenv");
dotenv.config();


const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// socket.io
io.on("connection", (socket) => {
    // console.log(`A connection have been made by clinet, socketId: ${socket.id}`);

    socket.on("user-msg", (data) => {
        // console.log(`Message received from client: ${data}`);

        io.emit("server-msg", data);
    });
});




app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "public/index.html"));
});


server.listen(port, () => console.log(`Server is live on port: ${port}`));