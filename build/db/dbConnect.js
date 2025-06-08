"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    const environment = process.env.ENVIRONMENT;
    let mongoString = "";
    if (environment == "development") {
        mongoString = process.env.MONGO_STRING_DEV;
    }
    else {
        mongoString = process.env.MONGO_STRING_PROD;
    }
    mongoose_1.default
        .connect(mongoString)
        .then(() => console.log(`
Connection: success
Environment: ${process.env.ENVIRONMENT}
Database: ${process.env.ENVIRONMENT == "development" ? "test" : "primary"}
      `))
        .catch((err) => {
        console.log({ message: "Failed to Connect to DataBase", err });
    });
};
exports.default = connectToDatabase;
