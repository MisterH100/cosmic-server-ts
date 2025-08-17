import express from 'express';
import CosmicReport from "../models/cosmic-report.model";
import { io } from '../websocket/socket';
import { v2 as cloudinary } from 'cloudinary'
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


export const NewReport = async (req: express.Request, res: express.Response) => {

  const {
    tokenID,
    pc,
    room,
    category,
    status,
    description,
    technician,
    submittedOn,
    submittedBy,
    notes,
  } = req.body;

  const file = req.file;

  try {
    let filename;
    if (typeof file == "undefined") {
      filename = "paper.png"
      const newReport = new CosmicReport({
        tokenID,
        pc,
        room,
        category,
        status,
        description,
        file: `https://res.cloudinary.com/dxrpjdomo/image/upload/v1755440483/cosmic-uploads/${filename}`,
        submittedOn,
        submittedBy,
        notes,
        technician,
        history: new Array(),
      });
      await newReport.save();
      res.json(newReport);
      io.emit("updateReports");
    }
    else {
      filename = file.filename;
      const cleanseString = (string: string) => {
        return (
          string
            .replace(/.png|.jpg|.jpeg/gi, "")
            .toLocaleLowerCase()
            .trim()
        );
      };
      cloudinary.uploader
        .upload(path.join(__dirname, `../../uploads/${filename}`),
          {
            folder: "cosmic-uploads",
            public_id: cleanseString(filename),
          },
          async (err, data) => {
            if (err) {
              throw new Error(err.message)
            } else {

              const newReport = new CosmicReport({
                tokenID,
                pc,
                room,
                category,
                status,
                description,
                file: data?.url,
                submittedOn,
                submittedBy,
                notes,
                technician,
                history: new Array(),
              });
              await newReport.save();
              res.json(newReport);
              io.emit("updateReports");
            }
          }
        )
    }

  } catch (error) {
    res.send(error);
  }
};

export const GetReportById = async (req: express.Request, res: express.Response) => {
  const tokenID = req.params.id;
  try {
    CosmicReport.findById(tokenID).then((report) => {
      res.json({ report });
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get report, internal server error",
      error: error,
    });
  }
};

export const UpdateReportStatus = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const { adminId, adminEmail, status } = req.body;
  try {
    let rep = await CosmicReport.findById(id);
    CosmicReport.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
        $push: {
          history: {
            updated_by: {
              id: adminId,
              email: adminEmail,
            },
            status: status,
            notes: rep?.notes,
            assigned_to: rep?.technician,
            updated_at: Date.now(),
          }
        }
      },
    ).then((report) => {
      res.json({ report, status: status });
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update report, internal server error",
      error: error,
    });
  }
};

export const UpdateReportNotes = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const { adminId, adminEmail, notes } = req.body;
  try {
    let rep = await CosmicReport.findById(id);

    CosmicReport.updateOne(
      { _id: id },
      {
        $set: {
          notes: notes,
        },
        $push: {
          history: {
            updated_by: {
              id: adminId,
              email: adminEmail,
            },
            status: rep?.status,
            notes: notes,
            assigned_to: rep?.technician,
            updated_at: Date.now(),
          }
        }
      },
    ).then((report) => {
      res.json({ report, notes: notes });
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update report, internal server error",
      error: error,
    });
  }
};

export const GetReports = async (req: express.Request, res: express.Response) => {
  try {
    await CosmicReport.find()
      .sort({ createdAt: "descending" })
      .then((reports) => {
        res.json(reports);
      });
  } catch (error) {
    res.json(error);
  }
};

export const GetReportsByUser = async (req: express.Request, res: express.Response) => {
  const { pc, room } = req.body;
  try {
    CosmicReport.find({ pc: pc, room: room }).then((reports) => {
      res.json(reports);
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get reports, internal server error",
      error: error,
    });
  }
};

export const AssignReport = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const { adminId, adminEmail, technician } = req.body;
  try {
    let rep = await CosmicReport.findById(id);
    CosmicReport.updateOne(
      { _id: id },
      {
        $set: {
          technician: technician,
        },
        $push: {
          history: {
            updated_by: {
              id: adminId,
              email: adminEmail,
            },
            status: rep?.status,
            notes: rep?.notes,
            assigned_to: technician,
            updated_at: Date.now(),

          }
        }
      },
    ).then((report) => {
      res.json({ report, technician: technician });
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to assign report, internal server error",
      error: error,
    });
  }
}

export const GetAssignedReports = async (req: express.Request, res: express.Response) => {
  const email = req.params.email;
  try {
    CosmicReport.find({ technician: email }).then((reports) => {
      res.json(reports);
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get reports, internal server error",
      error: error,
    });
  }
}

export const DeleteReport = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  try {
    await CosmicReport.deleteOne({ _id: id }).then(() => {
      res.json({ deleted: true });
    });
    io.emit("updateReports");
  } catch (error) {
    res.json(error);
  }
};

