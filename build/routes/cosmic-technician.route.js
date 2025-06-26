"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cosmic_technician_controller_1 = require("../controllers/cosmic-technician.controller");
const verifyClearance_1 = __importDefault(require("../middleware/verifyClearance"));
// import protectRoute from "../middleware/protectRoute.js";
const router = express_1.default.Router();
router.post("/technician/register", verifyClearance_1.default, cosmic_technician_controller_1.RegisterCosmicTechnician);
router.post("/technician/login", cosmic_technician_controller_1.LoginCosmicTechnician);
router.post("/technician/update/pass", cosmic_technician_controller_1.UpdateCosmcicTechnicianPass);
router.post("/technician/logout", cosmic_technician_controller_1.LogoutCosmicTechnician);
router.get("/technician/all", cosmic_technician_controller_1.GetAllCosmicTechnicians);
// router.post("/update", protectRoute, updateTechnician);
// router.get("/auth", protectRoute, authTechnician);
exports.default = router;
