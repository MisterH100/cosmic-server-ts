
import { Document } from "mongoose";

interface Itable {
  DAY: string,
  MODULES: string[];
}
export interface scheduleInterface extends Document {
  FACULTY: string,
  COURSE: string,
  CERTIFICATE: string,
  TABLE: Itable[]
  _doc: any
}
