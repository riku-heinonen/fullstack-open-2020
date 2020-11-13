import express from 'express';
import patientService from '../services/patients';
import validatePatientDetails from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = validatePatientDetails(req.body);
    res.send(patientService.addPatient(newPatient));
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

export default router;
