
import mongoose from "mongoose";
import { adminInterface } from "../interfaces/cosmic-admin.interface";

const cosmicTechicianSchema = new mongoose.Schema<adminInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String
    },
    clearance_level: {
      type: Number,
    },
    logged_in: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const CosmicTechnician = mongoose.model("CosmicTechnician", cosmicTechicianSchema);
export default CosmicTechnician;
