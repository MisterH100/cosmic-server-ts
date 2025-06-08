import { Document } from "mongoose";

export interface adminInterface extends Document {
  email: string,
  password: string,
  role: string,
  clearance_level: number,
  logged_in: boolean,
  _doc: any
}
