import express from "express";
import {
  LoginCosmicUser,
  LogoutCosmicUser,
  RegisterCosmicUser,
  SignUpCosmicUser,
} from "../controllers/cosmic-user.controller";
// import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/user/register", RegisterCosmicUser);
router.post("/user/signup", SignUpCosmicUser);
router.post("/user/login", LoginCosmicUser);
router.post("/user/logout", LogoutCosmicUser);
// router.post("/update", protectRoute, updateUser);
// router.get("/auth", protectRoute, authUser);

export default router;
