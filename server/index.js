import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://project-tle.vercel.app"],
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server ping" });
});

io.on("connection", (socket) => {
  //   console.log("A user connected");

  socket.on("joinRoom", ({otherRoomID, username}) => {
    console.log(username, "joining room:", otherRoomID);
    socket.join(otherRoomID);
    socket.roomID = otherRoomID;
    socket.to(otherRoomID).emit("joinMessage", {username, otherRoomID});

    socket.on("editorChange", (data) => {
        socket.to(otherRoomID).emit("editorChange", data);
      });
  });

  socket.on("leaveRoom", ({username, roomID}) => {
    console.log("Leaving room: " + roomID);
    socket.to(roomID).emit("leaveMessage", {username, roomID});
    socket.leave(roomID);
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});

const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
