"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cosmicReportSchema = new mongoose_1.default.Schema({
    tokenID: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
    pc: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    technician: {
        type: String,
    },
    submittedOn: {
        type: String,
        required: true,
    },
    submittedBy: {
        type: String,
        default: "",
    }
}, { timestamps: true });
const CosmicReport = mongoose_1.default.model("CosmicReport", cosmicReportSchema);
exports.default = CosmicReport;
