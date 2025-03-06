"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var GCCStudentSchema = new mongoose_1.default.Schema({
    ID: {
        type: String,
    },
    FNAME: {
        type: String,
    },
    LNAME: {
        type: String,
    },
    GENDER: {
        type: String,
    },
    FACULTY: {
        type: String,
    },
    COURSE: {
        type: String,
    },
    YEAR: {
        type: Number,
    },
    CERTIFICATE: {
        type: String,
    },
    CAMPUS: {
        type: String,
    },
    PHONE: {
        type: String,
    },
    EMAIL: {
        type: String,
    }
}, { timestamps: false });
var GCCStudent = mongoose_1.default.model("gcc_student", GCCStudentSchema);
exports.default = GCCStudent;
