import express from "express";
import path from "path";
import {
  NewReport,
  GetReports,
  GetReportsByUser,
  GetReportById,
  AssignReport,
  GetAssignedReports,
  UpdateReportNotes,
  UpdateReportStatus,
  DeleteReport,
} from "../controllers/cosmic-report.controller";
// import protectRoute from "../middleware/protectRoute.js";
import verifyClearance from "../middleware/verifyClearance";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage()

const upload = multer({ storage: storage });
router.post("/report/new", upload.single("file"), NewReport);
router.get("/report/all", GetReports);
router.post("/report/all/user", GetReportsByUser);
router.get("/report/id/:id", GetReportById);
router.get("/report/email/:email", GetAssignedReports);
router.post("/report/notes/:id", UpdateReportNotes);
router.post("/report/assign/:id", AssignReport);
router.post("/report/status/:id", UpdateReportStatus);
router.delete("/report/delete/:id", verifyClearance, DeleteReport);
// router.post("/update", protectRoute, updateUser);
// router.get("/auth", protectRoute, authUser);

export default router;
