export interface Diagnose {
    code: string, 
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    ssn: string,
    dateOfBirth: string,
    gender: string,
    occupation: string
}

export type PatientEntry = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>

export enum Gender {
    Male = "male",
    Female = 'female',
    other = 'other'
}