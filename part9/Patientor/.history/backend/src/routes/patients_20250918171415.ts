import express from "express";
import { Entry, PatientEntry } from "../types";
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

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  res.json(patient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry: Entry = req.body;
    const addedEntry = patientsService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong.";
    if (e instanceof Error) errorMessage += " Error: " + e.message;
    res.status(400).send(errorMessage);
  }
});

export default router;
