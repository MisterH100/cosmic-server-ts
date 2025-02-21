import { Document } from "mongoose";

type genderT = "male" | "female";
export interface studentInterface extends Document {
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

export interface GCCStudentInterface extends Document {
  ID: string,
  FNAME: string,
  LNAME: string,
  GENDER: genderT,
  FACULTY: string,
  COURSE: string,
  YEAR: number,
  CERTIFICATE: string,
  CAMPUS: string,
  PHONE: string,
  EMAIL: string,
  _doc: any
}
