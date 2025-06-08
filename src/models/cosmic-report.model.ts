import mongoose from "mongoose";

const cosmicReportSchema = new mongoose.Schema(
  {
    tokenID: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    pc: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    technician: {
      type: String,
    },
    submittedOn: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const CosmicReport = mongoose.model("CosmicReport", cosmicReportSchema);
export default CosmicReport;
