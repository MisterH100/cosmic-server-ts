import mongoose, { Document } from "mongoose";

type genderT = "male" | "female";
interface studentInterface extends Document {
  studentID: string,
  first_name: string,
  last_name: string,
  email: string,
  gender: genderT,
  password: string,
  phone: string,
  address: string,
  profileImage: string
  logged_in: boolean,
  _doc: any
}

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
