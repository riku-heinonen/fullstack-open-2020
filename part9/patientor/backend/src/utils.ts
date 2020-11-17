/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */

import diagnoses from "./data/diagnoses";
import {
  EntryDetails,
  EntryType,
  Gender,
  HealthCheckRating,
  PatientDetails,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid or missing date: " + date);
  }

  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Invalid or missing gender: " + gender);
  }
  return gender;
};

const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error("Invalid or missing value: " + str);
  }

  return str;
};

const parseDiagnoses = (array: any): string[] => {
  if (!array || !(array instanceof Array)) {
    throw new Error("Invalid or missing value: " + array);
  }
  array.forEach((code) => {
    if (
      !code ||
      !isString(code) ||
      !diagnoses.find((diagnosis) => diagnosis.code === code)
    ) {
      throw new Error("Invalid diagnosis code: " + code);
    }
  });
  return array;
};

const parseEntryType = (str: any): EntryType => {
  const type = parseString(str);
  if (
    !(
      type === "Hospital" ||
      type === "OccupationalHealthcare" ||
      type === "HealthCheck"
    )
  ) {
    throw new Error("Invalid entry type: " + str);
  }
  return type;
};

const parseHealthCheckRating = (object: any): HealthCheckRating => {
  if (!object || !(object instanceof Number)) {
    throw new Error("Invalid or missing value: " + object);
  }
  switch (object) {
    case 0:
      return HealthCheckRating.Healthy;
    case 1:
      return HealthCheckRating.LowRisk;
    case 2:
      return HealthCheckRating.HighRisk;
    case 3:
      return HealthCheckRating.CriticalRisk;
    default:
      throw new Error("Invalid health check rating: " + object);
  }
};

const toPatientDetails = (object: any): PatientDetails => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };
};

export const toEntryDetails = (object: any): EntryDetails => {
  const entryType = parseEntryType(object.type);
  const baseEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
  };
  switch (entryType) {
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.dischargedate),
          criteria: parseString(object.discharge.criteria),
        },
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        },
      };
    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
  }
};

export default toPatientDetails;
