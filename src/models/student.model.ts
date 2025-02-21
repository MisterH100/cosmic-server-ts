import mongoose from "mongoose";
import { studentInterface } from "../interfaces/student.interface";

const studentSchema = new mongoose.Schema<studentInterface>(
  {
    studentID: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    logged_in: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
