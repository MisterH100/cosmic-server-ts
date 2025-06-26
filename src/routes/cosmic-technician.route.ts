import express from "express";
import {
  LoginCosmicTechnician,
  LogoutCosmicTechnician,
  RegisterCosmicTechnician,
  UpdateCosmcicTechnicianPass,
  GetAllCosmicTechnicians
} from "../controllers/cosmic-technician.controller";
import verifyClearance from "../middleware/verifyClearance";
// import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/technician/register", verifyClearance, RegisterCosmicTechnician);
router.post("/technician/login", LoginCosmicTechnician);
router.post("/technician/update/pass", UpdateCosmcicTechnicianPass);
router.post("/technician/logout", LogoutCosmicTechnician);
router.get("/technician/all", GetAllCosmicTechnicians)
// router.post("/update", protectRoute, updateTechnician);
// router.get("/auth", protectRoute, authTechnician);

export default router;
