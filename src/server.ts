import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/dbConnect";
import homeRoute from "./routes/home.route";
import adminRoute from "./routes/cosmic-admin.route"
import technicianRoute from "./routes/cosmic-technician.route"
import reportRoute from "./routes/cosmic-report.route"
import userRoute from "./routes/cosmic-user.route"
import { app, server } from "./websocket/socket";
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", homeRoute);
app.use("/api", adminRoute);
app.use("/api", technicianRoute)
app.use("/api", reportRoute);
app.use("/api", userRoute)

server.listen(process.env.PORT || 5000, () => {
  connectToDatabase();
  console.log(`Server started on http://localhost:${process.env.PORT || 5000} `);
});
