"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cosmic_user_controller_1 = require("../controllers/cosmic-user.controller");
// import protectRoute from "../middleware/protectRoute.js";
const router = express_1.default.Router();
router.post("/user/register", cosmic_user_controller_1.RegisterCosmicUser);
router.post("/user/signup", cosmic_user_controller_1.SignUpCosmicUser);
router.post("/user/login", cosmic_user_controller_1.LoginCosmicUser);
router.post("/user/logout", cosmic_user_controller_1.LogoutCosmicUser);
// router.post("/update", protectRoute, updateUser);
// router.get("/auth", protectRoute, authUser);
exports.default = router;
