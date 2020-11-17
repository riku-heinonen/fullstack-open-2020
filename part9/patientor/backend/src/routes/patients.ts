import express from "express";
import patientService from "../services/patients";
import toPatientDetails, { toEntryDetails } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toPatientDetails(req.body);
    res.send(patientService.addPatient(newPatient));
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = toEntryDetails(req.body);
    res.send(patientService.addEntry(patientId, newEntry));
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

export default router;
