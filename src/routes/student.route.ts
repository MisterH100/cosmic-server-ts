import express from "express";
import { logoutStudent, loginStudent, registerStudent, studentInfo } from "../controllers/student.controller";
import verifyID from "../middleware/verifyID";

const router = express.Router();
router.post("/register", verifyID, registerStudent);
router.post("/login", loginStudent);
router.post("/logout", logoutStudent);
router.get("/student-info/:id", studentInfo);

export default router;
