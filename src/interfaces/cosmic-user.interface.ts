import { Document } from "mongoose";

export interface userInterface extends Document {
  pc: string,
  username: string,
  userlast: string,
  useremail: string,
  usercountry: string,
  room: string,
  password: string,
  logged_in: boolean,
  _doc: any
}
