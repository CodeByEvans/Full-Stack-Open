import express from "express";
import { PatientEntry } from "../types";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: PatientEntry[] = patientsService.getPatients();
  res.json(data);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
