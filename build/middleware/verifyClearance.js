"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmic_admin_model_1 = __importDefault(require("../models/cosmic-admin.model"));
//
const verifyClearance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { adminID } = req.body;
    //
    try {
        const admin = yield cosmic_admin_model_1.default.find({ email: adminID });
        if (!admin) {
            return res.status(401).json({ message: "Forbidden Operation, Only admins can execute this operation", error: "identification error" });
        }
        next();
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = verifyClearance;
