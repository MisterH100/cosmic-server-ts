"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cosmic_admin_controller_1 = require("../controllers/cosmic-admin.controller");
// import protectRoute from "../middleware/protectRoute.js";
const router = express_1.default.Router();
router.post("/admin/register", cosmic_admin_controller_1.RegisterCosmicAdmin);
router.post("/admin/login", cosmic_admin_controller_1.LoginCosmicAdmin);
router.post("/admin/logout", cosmic_admin_controller_1.LogoutCosmicAdmin);
// router.post("/update", protectRoute, updateAdmin);
// router.get("/auth", protectRoute, authAdmin);
exports.default = router;
