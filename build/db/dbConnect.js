"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var connectToDatabase = function () {
    mongoose_1.default
        .connect(process.env.MONGO_STRING || " ")
        .then(function () { return console.log("Connected to DataBase"); })
        .catch(function (err) {
        console.log(err + "Failed to Connect to DataBase");
    });
};
exports.default = connectToDatabase;
