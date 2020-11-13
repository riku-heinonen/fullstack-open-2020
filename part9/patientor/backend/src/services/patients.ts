import { Patient, PatientDetails, PublicPatient } from '../types';

import patients from '../data/patients';
import { v4 as uuid } from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patientDetails: PatientDetails): PublicPatient => {
  const newPatient = { ...patientDetails, id: uuid() };
  patients.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
  };
};

export default { getPatients, getPatient, addPatient };
