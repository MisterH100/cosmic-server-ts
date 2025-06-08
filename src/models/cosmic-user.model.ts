import mongoose from "mongoose";
import { userInterface } from "../interfaces/cosmic-user.interface";

const cosmicUserSchema = new mongoose.Schema<userInterface>(
  {
    pc: {
      type: String,
      required: true,
    },
    username: {
      type: String
    },
    userlast: {
      type: String
    },
    useremail: {
      type: String
    },
    usercountry: {
      type: String
    },
    room: {
      type: String,
      required: true,
      default: "0"
    },
    password: {
      type: String,
      required: true,
    },
    logged_in: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const CosmicUser = mongoose.model("CosmicUser", cosmicUserSchema);
export default CosmicUser;
