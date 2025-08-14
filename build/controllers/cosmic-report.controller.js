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
exports.DeleteReport = exports.GetAssignedReports = exports.AssignReport = exports.GetReportsByUser = exports.GetReports = exports.UpdateReportNotes = exports.UpdateReportStatus = exports.GetReportById = exports.NewReport = void 0;
const cosmic_report_model_1 = __importDefault(require("../models/cosmic-report.model"));
const socket_1 = require("../websocket/socket");
const NewReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenID, pc, room, category, status, description, technician, submittedOn, submittedBy, notes, } = req.body;
    const file = req.file;
    let filename;
    if (typeof file == "undefined") {
        filename = "paper.png";
    }
    else {
        filename = file.filename;
    }
    try {
        const newReport = new cosmic_report_model_1.default({
            tokenID,
            pc,
            room,
            category,
            status,
            description,
            file: filename,
            submittedOn,
            submittedBy,
            notes,
            technician,
            history: new Array(),
        });
        yield newReport.save();
        res.json(newReport);
        socket_1.io.emit("updateReports");
    }
    catch (error) {
        res.send(error);
    }
});
exports.NewReport = NewReport;
const GetReportById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenID = req.params.id;
    try {
        cosmic_report_model_1.default.findById(tokenID).then((report) => {
            res.json({ report });
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get report, internal server error",
            error: error,
        });
    }
});
exports.GetReportById = GetReportById;
const UpdateReportStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { adminId, adminEmail, status } = req.body;
    try {
        let rep = yield cosmic_report_model_1.default.findById(id);
        cosmic_report_model_1.default.updateOne({ _id: id }, {
            $set: {
                status: status,
            },
            $push: {
                history: {
                    updated_by: {
                        id: adminId,
                        email: adminEmail,
                    },
                    status: status,
                    notes: rep === null || rep === void 0 ? void 0 : rep.notes,
                    assigned_to: rep === null || rep === void 0 ? void 0 : rep.technician,
                    updated_at: Date.now(),
                }
            }
        }).then((report) => {
            res.json({ report, status: status });
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update report, internal server error",
            error: error,
        });
    }
});
exports.UpdateReportStatus = UpdateReportStatus;
const UpdateReportNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { adminId, adminEmail, notes } = req.body;
    try {
        let rep = yield cosmic_report_model_1.default.findById(id);
        cosmic_report_model_1.default.updateOne({ _id: id }, {
            $set: {
                notes: notes,
            },
            $push: {
                history: {
                    updated_by: {
                        id: adminId,
                        email: adminEmail,
                    },
                    status: rep === null || rep === void 0 ? void 0 : rep.status,
                    notes: notes,
                    assigned_to: rep === null || rep === void 0 ? void 0 : rep.technician,
                    updated_at: Date.now(),
                }
            }
        }).then((report) => {
            res.json({ report, notes: notes });
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update report, internal server error",
            error: error,
        });
    }
});
exports.UpdateReportNotes = UpdateReportNotes;
const GetReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cosmic_report_model_1.default.find()
            .sort({ createdAt: "descending" })
            .then((reports) => {
            res.json(reports);
        });
    }
    catch (error) {
        res.json(error);
    }
});
exports.GetReports = GetReports;
const GetReportsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pc, room } = req.body;
    try {
        cosmic_report_model_1.default.find({ pc: pc, room: room }).then((reports) => {
            res.json(reports);
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get reports, internal server error",
            error: error,
        });
    }
});
exports.GetReportsByUser = GetReportsByUser;
const AssignReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { adminId, adminEmail, technician } = req.body;
    try {
        let rep = yield cosmic_report_model_1.default.findById(id);
        cosmic_report_model_1.default.updateOne({ _id: id }, {
            $set: {
                technician: technician,
            },
            $push: {
                history: {
                    updated_by: {
                        id: adminId,
                        email: adminEmail,
                    },
                    status: rep === null || rep === void 0 ? void 0 : rep.status,
                    notes: rep === null || rep === void 0 ? void 0 : rep.notes,
                    assigned_to: technician,
                    updated_at: Date.now(),
                }
            }
        }).then((report) => {
            res.json({ report, technician: technician });
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to assign report, internal server error",
            error: error,
        });
    }
});
exports.AssignReport = AssignReport;
const GetAssignedReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        cosmic_report_model_1.default.find({ technician: email }).then((reports) => {
            res.json(reports);
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get reports, internal server error",
            error: error,
        });
    }
});
exports.GetAssignedReports = GetAssignedReports;
const DeleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield cosmic_report_model_1.default.deleteOne({ _id: id }).then(() => {
            res.json({ deleted: true });
        });
        socket_1.io.emit("updateReports");
    }
    catch (error) {
        res.json(error);
    }
});
exports.DeleteReport = DeleteReport;
