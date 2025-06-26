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
  let date = Date.now();
  console.log(`--- websocket connection: ${socket.id} at ${parseTime(date)}`);
  socket.on("disconnect", () => {
    date = Date.now();
    console.log(`--- websocket disconnected: ${socket.id} at ${parseTime(date)}`)
  })

});

const parseTime = (date: number) => {
  const offsetMinutes = new Date(date).getTimezoneOffset();
  const milliseconds = new Date(date).getTime();
  const localTime = milliseconds - offsetMinutes * 60 * 1000;
  const minutes = Math.floor((localTime / 1000 / 60) % 60);
  const hours = Math.floor((localTime / 1000 / 60 / 60) % 24);

  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""
    }${minutes} ${hours >= 12 ? "pm" : "am"}`;
}

export { app, io, server }

