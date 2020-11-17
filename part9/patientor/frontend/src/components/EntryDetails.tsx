import React from "react";
import { assertNever } from "../helpers";
import { Diagnosis, Entry } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntry";
import HospitalEntryDetails from "./HospitalEntry";
import OccupationalHealthCareEntryDetails from "./OccupationalHealthCareEntry";

interface EntryDetailsProps {
  entryWithDiagnoses: Entry & { diagnoses?: Diagnosis[] };
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entryWithDiagnoses }) => {
  switch (entryWithDiagnoses.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entryWithDiagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entryWithDiagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryDetails entry={entryWithDiagnoses} />;
    default:
      return assertNever(entryWithDiagnoses);
  }
};

export default EntryDetails;
