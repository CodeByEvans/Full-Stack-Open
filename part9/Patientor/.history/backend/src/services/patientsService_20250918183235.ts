import patients from "../../data/patients";
import patientsData from "../../data/patients";
import { Entry, Gender, NewPatient, Patient, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): PatientEntry[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender: gender as Gender,
      occupation,
      entries: entries as Entry[],
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();

  const newPatient = { id: id, ...patient, entries: [] as never[] };
  patientsData.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) return undefined;
  return {
    ...patient,
    gender: patient.gender as Gender,
    entries: patient.entries ?? [],
  };
};

const addEntry = (id: string, newEntry: Entry): Entry => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) throw new Error("Patient not found");
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, addPatient, getPatientById, addEntry };
