"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cosmicTechicianSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String
    },
    clearance_level: {
        type: Number,
    },
    logged_in: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const CosmicTechnician = mongoose_1.default.model("CosmicTechnician", cosmicTechicianSchema);
exports.default = CosmicTechnician;
