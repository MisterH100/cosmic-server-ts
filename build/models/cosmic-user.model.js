"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cosmicUserSchema = new mongoose_1.default.Schema({
    pc: {
        type: String,
        required: true,
    },
    username: {
        type: String
    },
    userlast: {
        type: String
    },
    useremail: {
        type: String
    },
    usercountry: {
        type: String
    },
    room: {
        type: String,
        required: true,
        default: "0"
    },
    password: {
        type: String,
        required: true,
    },
    logged_in: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const CosmicUser = mongoose_1.default.model("CosmicUser", cosmicUserSchema);
exports.default = CosmicUser;
