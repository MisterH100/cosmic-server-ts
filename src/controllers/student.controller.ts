import express from "express";
import bcrypt from "bcrypt";
import Student from "../models/student.model";
import GCCStudent from "../models/gcc-student.model";

export const registerStudent = async (req: any, res: express.Response) => {
  const { studentID, first_name, last_name, email, phone, gender, address, password } = req.stu;
  try {
    const student = await Student.findOne({ studentID: studentID });
    if (student) {
      res.status(409).json({ message: "this ID is already registered", error: "conflict error" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${first_name}`;
      const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${first_name}`;
      const newStudent = new Student({
        studentID: studentID,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        phone: phone,
        gender: gender,
        address: address,
        profileImage: gender === "male" ? maleProfilePic : femaleProfilePic,
      });

      await newStudent.save();
      res.status(200).json({
        message: "student registered successfully",
        student: {
          _id: newStudent._id,
          studentID: newStudent.studentID,
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          email: newStudent.email,
          phone: newStudent.phone,
          gender: newStudent.gender,
          address: newStudent.address,
          profileImage: newStudent.profileImage,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to register, internal server error", error });
  }
}

export const loginStudent = async (req: express.Request, res: express.Response) => {
  const { studentID, password } = req.body;
  try {
    const student = await Student.findOne({ studentID: studentID });
    if (!student) {
      res.status(400).json({ message: "student does not exist", error: "invalid error" });
    } else {
      const validatePassword = bcrypt.compareSync(password, student.password);

      if (!validatePassword) {
        res.status(400).json({ message: "wrong credentials", error: "invalid error" });
      }
      if (validatePassword) {
        await Student.findByIdAndUpdate(student._id, {
          $set: { logged_in: true },
        });

        const { password, ...details } = student._doc;

        res
          .status(200)
          .json({ message: "login successful", student: details });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to login, internal server error", error });
  }
}

export const logoutStudent = async (req: express.Request, res: express.Response) => {
  const student_ID = req.body.id;
  try {
    await Student.findByIdAndUpdate(student_ID, { logged_in: false });

    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to logout, internal server error", error });
  }
};

export const studentInfo = async (req: express.Request, res: express.Response) => {
  const student_ID = req.params.id;
  try {
    const studentInfo = await GCCStudent.findOne({ ID: student_ID });
    res.status(200).json({ studentInfo, message: "successfully found student info" });
  } catch (error) {
    res.status(500).json({ message: "failed to fetch student info, internal server error", error });
  }

}
