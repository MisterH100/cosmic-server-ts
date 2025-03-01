"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var scheduleSchema = new mongoose_1.default.Schema({
    FACULTY: {
        type: String
    },
    COURSE: {
        type: String,
    },
    CERTIFICATE: {
        type: String
    },
    TABLE: {
        type: []
    }
});
var Schedule = mongoose_1.default.model("Schedule", scheduleSchema);
exports.default = Schedule;
