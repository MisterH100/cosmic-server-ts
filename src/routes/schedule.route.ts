
import express from "express";
import { getSchedule, getSchedules } from "../controllers/schedule.controller";

const router = express.Router();
router.get("/schedule", getSchedule);
router.get("/schedules", getSchedules);

export default router;
