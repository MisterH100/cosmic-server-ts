import express from 'express';
import CosmicReport from "../models/cosmic-report.model";
import { io } from '../websocket/socket';


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
  try {
    const newReport = new CosmicReport({
      tokenID,
      pc,
      room,
      category,
      status,
      description,
      submittedOn,
      submittedBy,
      notes,
      technician
    });
    await newReport.save();
    res.json(newReport);
    io.emit("updateReports");
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
  const { status } = req.body;
  try {
    CosmicReport.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
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
  const { notes } = req.body;
  try {
    CosmicReport.updateOne(
      { _id: id },
      {
        $set: {
          notes: notes,
        },
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
  const { technician } = req.body;
  try {
    CosmicReport.updateOne(
      { _id: id },
      {
        $set: {
          technician: technician,
        },
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

