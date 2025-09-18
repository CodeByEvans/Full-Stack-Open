"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = (0, express_1.default)();
router.get('/', (_req, res) => {
    const data = patientsService_1.default.getPatients();
    res.json(data);
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong. ';
        if (error instanceof Error) {
            errorMessage += 'Error:' + errorMessage;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
