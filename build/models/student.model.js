"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var studentSchema = new mongoose_1.default.Schema({
    studentID: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    profileImage: {
        type: String,
        default: "",
    },
    logged_in: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
var Student = mongoose_1.default.model("Student", studentSchema);
exports.default = Student;
