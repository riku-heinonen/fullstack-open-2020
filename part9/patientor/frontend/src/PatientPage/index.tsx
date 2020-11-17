import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import EntryDetails from "../components/EntryDetails";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { GenderIconName, Patient } from "../types";

const PatientPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
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
  console.log(patient?.entries);
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
              <Header as="h2">Entries</Header>
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
    </Container>
  );
};

export default PatientPage;
