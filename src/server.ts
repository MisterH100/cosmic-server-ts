import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/dbConnect";
import homeRoute from "./routes/home.route";
import studentRoute from "./routes/student.route";
import scheduleRoute from "./routes/schedule.route";

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", homeRoute);
app.use("/api", studentRoute);
app.use("/api", scheduleRoute);

app.listen(process.env.PORT || 5000, () => {
  connectToDatabase();
  if (process.env.NODE_ENV === "development") {
    console.log(`Server started on http://localhost:${process.env.PORT || 5000} `);
  } else {
    console.log(`Server listening on port ${process.env.PORT || 5000}`)
  }
});
