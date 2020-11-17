import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, Container, Divider, Header } from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import { setDiagnosisList, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnosisList = async () => {
      const { data: diagnoses } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnosisList(diagnoses));
    };
    fetchPatientList();
    fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container style={{ marginTop: "2em" }}>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
