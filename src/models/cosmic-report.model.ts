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
    file: {
      type: String,
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
    history: {
      type: [
        {
          updated_by: {
            type: {
              id: {
                type: String
              },
              email: {
                type: String
              }
            }
          },
          status: {
            type: String,
            default: "",
          },
          notes: {
            type: String,
            default: "open"
          },
          assigned_to: {
            type: String
          },
          updated_at: {
            type: Date,
            default: Date.now(),
          }
        }
      ]
    },
    submittedOn: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: String,
      default: "",
    }
  },
  { timestamps: true },
);

const CosmicReport = mongoose.model("CosmicReport", cosmicReportSchema);
export default CosmicReport;
