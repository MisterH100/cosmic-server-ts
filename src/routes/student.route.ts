import express from "express";
import { logoutStudent, loginStudent, registerStudent } from "../controllers/student.controller";
import verifyID from "../middleware/verifyID";

const router = express.Router();
router.post("/register", verifyID, registerStudent);
router.post("/login", loginStudent);
router.post("/logout", logoutStudent);

export default router;
