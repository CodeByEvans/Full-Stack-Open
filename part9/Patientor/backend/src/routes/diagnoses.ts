import express from "express";
import { Diagnose } from "../types";
import diagnosesService from "../services/diagnosesService";

const router = express()

router.get('/', (_req, res) => {
    const data : Diagnose[] = diagnosesService.getDiagnoses()
    res.json(data)
})

export default router