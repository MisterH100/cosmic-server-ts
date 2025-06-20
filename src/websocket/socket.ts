import { Server } from "socket.io";
import express from "express";
import http from "http"
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  const date = Date.now();
  console.log(`user connected: ${socket.id} at ${parseTime(date)}`);
  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`)
  })

});

const parseTime = (date: number) => {
  const offsetMinutes = new Date(date).getTimezoneOffset();
  const milliseconds = new Date(date).getTime();
  const localTime = milliseconds - offsetMinutes * 60 * 1000;
  // const seconds = Math.floor((localTime / 1000) % 60);
  const minutes = Math.floor((localTime / 1000 / 60) % 60);
  const hours = Math.floor((localTime / 1000 / 60 / 60) % 24);

  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""
    }${minutes} ${hours >= 12 ? "pm" : "am"}`;
}

export { app, io, server }

