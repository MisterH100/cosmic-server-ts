import mongoose from "mongoose";
import { GCCStudentInterface } from "../interfaces/student.interface";

const GCCStudentSchema = new mongoose.Schema<GCCStudentInterface>(
  {
    ID: {
      type: String,
    },
    FNAME: {
      type: String,
    },
    LNAME: {
      type: String,
    },
    GENDER: {
      type: String,
    },
    FACULTY: {
      type: String,
    },
    COURSE: {
      type: String,
    },
    YEAR: {
      type: Number,
    },
    CERTIFICATE: {
      type: String,
    },
    CAMPUS: {
      type: String,
    },
    PHONE: {
      type: String,
    },
    EMAIL: {
      type: String,
    }

  },

  { timestamps: false },
);

const GCCStudent = mongoose.model("gcc_student", GCCStudentSchema);
export default GCCStudent;
