import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
  };
  
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const validateString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error ('Incorrect or missing text')
    }
    
    return text
}

const parseDate = (date:unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error ('Incorrect or missing date: ' + date)
    }

    return date
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param)
}

const parseGender = (gender: string): Gender => {
    if (!isGender(gender)) {
      throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

const toNewPatient = (object: any): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const { name, dateOfBirth, ssn, gender, occupation } = object;

  const validatedName = validateString(name)

  const parsedDateOfBirth = parseDate(dateOfBirth)

  const validatedSsn = validateString(ssn)

  const parsedGender = parseGender(gender)

  const validatedOccupation = validateString(occupation)

  const newPatient: NewPatient = {
    name: validatedName,
    dateOfBirth: parsedDateOfBirth,
    ssn: validatedSsn,
    gender: parsedGender,
    occupation: validatedOccupation
  };

  return newPatient;
};

export default toNewPatient;
