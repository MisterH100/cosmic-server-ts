"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cosmic_report_controller_1 = require("../controllers/cosmic-report.controller");
// import protectRoute from "../middleware/protectRoute.js";
const verifyClearance_1 = __importDefault(require("../middleware/verifyClearance"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../uploads/"));
    },
    filename: function (req, file, cb) {
        let extension = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post("/report/new", upload.single("file"), cosmic_report_controller_1.NewReport);
router.get("/report/all", cosmic_report_controller_1.GetReports);
router.post("/report/all/user", cosmic_report_controller_1.GetReportsByUser);
router.get("/report/id/:id", cosmic_report_controller_1.GetReportById);
router.get("/report/email/:email", cosmic_report_controller_1.GetAssignedReports);
router.post("/report/notes/:id", cosmic_report_controller_1.UpdateReportNotes);
router.post("/report/assign/:id", cosmic_report_controller_1.AssignReport);
router.post("/report/status/:id", cosmic_report_controller_1.UpdateReportStatus);
router.delete("/report/delete/:id", verifyClearance_1.default, cosmic_report_controller_1.DeleteReport);
// router.post("/update", protectRoute, updateUser);
// router.get("/auth", protectRoute, authUser);
exports.default = router;
