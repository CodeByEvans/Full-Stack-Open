import patientsData from "../../data/patients";
import { NewPatient, Patient, PatientEntry } from "../types";
import {v1 as uuid} from 'uuid'

const id = uuid()

const getPatients = (): PatientEntry[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = (patient: NewPatient):Patient => {
        const newPatient = { id: id, ...patient}
        patientsData.push(newPatient)
        return newPatient
}

export default { getPatients, addPatient }