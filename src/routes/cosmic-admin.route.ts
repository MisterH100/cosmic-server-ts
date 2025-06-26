import express from "express";
import {
  LoginCosmicAdmin,
  LogoutCosmicAdmin,
  RegisterCosmicAdmin,
  UpdateCosmcicAdminPass
} from "../controllers/cosmic-admin.controller";
// import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/admin/register", RegisterCosmicAdmin);
router.post("/admin/login", LoginCosmicAdmin);
router.post("/admin/update/pass", UpdateCosmcicAdminPass);
router.post("/admin/logout", LogoutCosmicAdmin);
// router.post("/update", protectRoute, updateAdmin);
// router.get("/auth", protectRoute, authAdmin);

export default router;
