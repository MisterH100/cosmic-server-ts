"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var schedule_controller_1 = require("../controllers/schedule.controller");
var router = express_1.default.Router();
router.get("/schedule", schedule_controller_1.getSchedule);
router.get("/schedules", schedule_controller_1.getSchedules);
exports.default = router;
