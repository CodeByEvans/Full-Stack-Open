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

export default { getPatients, addPatient };
