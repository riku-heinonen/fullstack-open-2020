import diagnosisService from '../services/diagnoses';
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

export default router;
