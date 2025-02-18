import express from "express";
import { logoutStudent, loginStudent, registerStudent } from "../controllers/student.controller";

const router = express.Router();
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/logout", logoutStudent);

export default router;
