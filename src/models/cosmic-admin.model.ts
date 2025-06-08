import mongoose from "mongoose";
import { adminInterface } from "../interfaces/cosmic-admin.interface";

const cosmicAdminSchema = new mongoose.Schema<adminInterface>(
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

const CosmicAdmin = mongoose.model("CosmicAdmin", cosmicAdminSchema);
export default CosmicAdmin;
