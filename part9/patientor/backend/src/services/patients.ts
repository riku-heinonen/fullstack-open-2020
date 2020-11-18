import {
  Entry,
  EntryDetails,
  Patient,
  PatientDetails,
  PublicPatient,
} from "../types";

import patients from "../data/patients";
import { v4 as uuid } from "uuid";

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
  const newPatient = { ...patientDetails, id: uuid(), entries: [] };
  patients.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
  };
};

const addEntry = (patientId: string, entryDetails: EntryDetails): Entry => {
  const newEntry: Entry = { ...entryDetails, id: uuid() };
  const patient = patients.find((patient) => patient.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, getPatient, addPatient, addEntry };
