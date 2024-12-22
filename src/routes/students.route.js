import express from "express";
import { addStudent, getAllStudents, getStudent, sendEmail } from "../controllers/students.controllers.js";

const router = express.Router();

router.post("/student", addStudent);
router.get("/student/:id", getStudent);
router.get("/allstudent", getAllStudents);
router.get("/sendemail", sendEmail);

export default router;