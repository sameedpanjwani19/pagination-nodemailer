import Course from "../models/course.models.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import studentsModels from "../models/students.models.js";

// nodemailer config
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "lela1@ethereal.email",
    pass: "Q81B2fkQneBfW2Tjde",
  },
});

const addStudent = async (req, res) => {
  const { fullName, email, enrolledCourse } = req.body;

  if (!fullName)
    return res.status(400).json({
      message: "fullname is required",
    });
  if (!email)
    return res.status(400).json({
      message: "email is required",
    });

  const student = await studentsModels.create({
    fullName,
    email,
    enrolledCourse,
  });

  const course = await Course.findByIdAndUpdate(enrolledCourse, {
    $push: { enrolledStudents: student._id },
  });

  res.json({ message: "student added successfully" });
};

//get student

const getStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid Id" });
  }

  const student = await Students.findById(id).populate("enrolledCourse");
  if (!student) {
    res.status(404).json({
      message: "no todo found!",
    });
    return;
  }

  res.status(200).json(student);
};

// pagination

const getAllStudents = async (req, res) => {

    const page = req.query.page  || 1;
    const limit = req.query.limit || 3;

    const skip = (page-1) * limit

    const student = await Students.find({}).skip(skip).limit(limit)

    res.status(200).json({
        data: student, length: student.length
    });

};

// node mailer

const sendEmail = async (req, res) => {
  const info = await transporter.sendMail({
    from: '"Lela Mohr 👻" <lela1@ethereal.email>', // sender address
    to: "abdulsameedpanjwani@gmail.com", // list of receivers
    subject: "Hello World",
    text: "checking nodemailer", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.send("email sent");
};

export { addStudent, getStudent, getAllStudents , sendEmail };