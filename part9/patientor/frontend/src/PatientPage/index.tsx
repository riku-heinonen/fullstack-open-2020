import { ApiEntryDetails, Entry, GenderIconName, Patient } from "../types";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { updatePatient, useStateValue } from "../state";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../components/EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const PatientPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async (id: string): Promise<void> => {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      setPatient(patient);
      dispatch(updatePatient(patient));
    };

    const existingPatient: Patient | undefined = patients[id];
    if (!existingPatient || !existingPatient.ssn) {
      fetchPatient(id);
    } else {
      setPatient(existingPatient);
    }
  }, [patients, id, dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    if (patient) {
      let baseEntryDetails = {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
      };
      let entryDetails: ApiEntryDetails;
      switch (values.type) {
        case "Hospital":
          if (!values.dischargeDate || !values.dischargeCriteria) {
            throw new Error(
              "Discharge date and criteria are required fields for hospital entries."
            );
          }
          entryDetails = {
            ...baseEntryDetails,
            type: "Hospital",
            discharge: {
              date: values.dischargeDate,
              criteria: values.dischargeCriteria,
            },
          };
          break;
        case "HealthCheck":
          if (!values.healthCheckRating) {
            throw new Error(
              "Health rating is a required field for health check entries."
            );
          }
          entryDetails = {
            ...baseEntryDetails,
            type: "HealthCheck",
            healthCheckRating: values.healthCheckRating,
          };
          break;
        case "OccupationalHealthcare":
          if (!values.employerName) {
            throw new Error(
              "Employer name is a required field for occupational healthcare entries."
            );
          }
          entryDetails = {
            ...baseEntryDetails,
            type: "OccupationalHealthcare",
            employerName: values.employerName,
            sickLeave:
              values.sickLeaveStartDate && values.sickLeaveEndDate
                ? {
                    startDate: values.sickLeaveStartDate,
                    endDate: values.sickLeaveEndDate,
                  }
                : undefined,
          };
          break;
      }
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          entryDetails
        );
        dispatch({
          type: "UPDATE_PATIENT",
          payload: { ...patient, entries: [...patient.entries, newEntry] },
        });
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const getGenderIconName = (gender: string): GenderIconName => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "transgender";
    }
  };

  return (
    <Container className="App">
      {!patient && <Header as="h3"> No such patient </Header>}
      {patient && (
        <Container>
          <h2>
            {patient.name} <Icon name={getGenderIconName(patient.gender)} />
          </h2>
          <Container
            style={{ fontWeight: "bold", color: "grey", fontSize: "1.1em" }}
          >
            SSN: {patient.ssn}
          </Container>
          <Container
            style={{ fontWeight: "bold", color: "grey", fontSize: "1.1em" }}
          >
            Occupation: {patient.occupation}
          </Container>
          {patient.entries.length ? (
            <>
              <Header as="h2">Entries </Header>
              <Button
                color="green"
                icon
                labelPosition="left"
                onClick={() => openModal()}
              >
                <Icon name="plus" />
                Add entry
              </Button>
              <Segment.Group>
                {patient.entries.map((entry, index) => {
                  const entryWithDiagnoses = {
                    ...entry,
                    diagnoses: entry.diagnosisCodes
                      ?.map((code) => diagnoses[code])
                      .filter((diagnosis) => diagnosis !== undefined),
                  };
                  return (
                    <EntryDetails
                      key={index}
                      entryWithDiagnoses={entryWithDiagnoses}
                    />
                  );
                })}
              </Segment.Group>
            </>
          ) : (
            <Header as="h3"> No entries </Header>
          )}
        </Container>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </Container>
  );
};

export default PatientPage;
