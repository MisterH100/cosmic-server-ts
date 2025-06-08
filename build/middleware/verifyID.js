"use strict";
// import express from "express"
// import GCCStudent from "../models/gcc-student.model";
//
// const verifyID = async (req: any, res: express.Response, next: express.NextFunction) => {
//   let { studentID, first_name, last_name, email, phone, gender, address, password } = req.body;
//
//   try {
//     const submittedID = studentID;
//     const registerdStudent = await GCCStudent.findOne({ ID: submittedID })
//     if (!registerdStudent) {
//       return res.status(401).json({ message: "Student with this ID is not registerd with GCC", error: "identification error" });
//     }
//
//     studentID = registerdStudent.ID;
//     first_name = registerdStudent.FNAME.toLowerCase();
//     last_name = registerdStudent.LNAME.toLowerCase();
//     gender = registerdStudent.GENDER.toLowerCase();
//
//     const student = { studentID, first_name, last_name, email, phone, gender, address, password }
//     req.stu = student;
//     next();
//   } catch (error) {
//     res.send(error)
//   }
// }
//
// export default verifyID;
