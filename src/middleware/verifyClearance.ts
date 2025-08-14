import express from "express"
import CosmicAdmin from "../models/cosmic-admin.model"
//
const verifyClearance = async (req: any, res: express.Response, next: express.NextFunction) => {
  let { adminID } = req.body;
  //
  try {
    const admin = await CosmicAdmin.find({ email: adminID });
    if (!admin) {
      throw new Error("identification error")
    }
    next();
  } catch (error: any) {
    res.status(401).json({ message: "Forbidden Operation, Only admins can execute this operation", error: error.message });
  }
}

export default verifyClearance;
