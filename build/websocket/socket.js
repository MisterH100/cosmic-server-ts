"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = void 0;
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
exports.io = io;
io.on("connection", (socket) => {
    const date = Date.now();
    console.log(`user connected: ${socket.id} at ${parseTime(date)}`);
    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
    });
});
const parseTime = (date) => {
    const offsetMinutes = new Date(date).getTimezoneOffset();
    const milliseconds = new Date(date).getTime();
    const localTime = milliseconds - offsetMinutes * 60 * 1000;
    // const seconds = Math.floor((localTime / 1000) % 60);
    const minutes = Math.floor((localTime / 1000 / 60) % 60);
    const hours = Math.floor((localTime / 1000 / 60 / 60) % 24);
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes} ${hours >= 12 ? "pm" : "am"}`;
};
