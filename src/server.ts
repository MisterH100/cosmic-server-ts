import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import studentRoute from "./routes/student.route"
import connectToDatabase from "./db/dbConnect";
import homeRoute from "./routes/home.route";
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", homeRoute);
app.use("/api", studentRoute)

app.listen(process.env.PORT || 5000, () => {
  connectToDatabase();
  console.log(`listening on port ${process.env.PORT || 5000} `);
});
