"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const validateString = (text) => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing text');
    }
    return text;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    const { name, dateOfBirth, ssn, gender, occupation } = object;
    const validatedName = validateString(name);
    const parsedDateOfBirth = parseDate(dateOfBirth);
    const validatedSsn = validateString(ssn);
    const parsedGender = parseGender(gender);
    const validatedOccupation = validateString(occupation);
    const newPatient = {
        name: validatedName,
        dateOfBirth: parsedDateOfBirth,
        ssn: validatedSsn,
        gender: parsedGender,
        occupation: validatedOccupation
    };
    return newPatient;
};
exports.default = toNewPatient;
