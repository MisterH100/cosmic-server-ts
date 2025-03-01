import mongoose from "mongoose";
import { scheduleInterface } from "../interfaces/schedule.interface";


const scheduleSchema = new mongoose.Schema<scheduleInterface>(
  {
    FACULTY: {
      type: String
    },
    COURSE: {
      type: String,
    },
    CERTIFICATE: {
      type: String
    },
    TABLE: {
      type: []
    }
  });

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
