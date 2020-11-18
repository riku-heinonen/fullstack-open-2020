import {
  Container,
  Grid,
  Header,
  Icon,
  List,
  Segment,
} from "semantic-ui-react";
import { Diagnosis, HospitalEntry } from "../types";

import React from "react";

interface HospitalEntryProps {
  entry: HospitalEntry & { diagnoses?: Diagnosis[] };
}

const HospitalEntryDetails: React.FC<HospitalEntryProps> = ({ entry }) => {
  return (
    <Segment>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={1} style={{ marginRight: "1em" }}>
            <Icon size="huge" name="hospital" float="left" />
          </Grid.Column>
          <Grid.Column width={14} verticalAlign="middle">
            <Header>{entry.date}</Header>
            <Header as="h5" style={{ color: "grey", marginTop: "-0.75em" }}>
              {entry.description}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {entry.diagnoses && (
            <Grid.Column width={8} style={{ marginRight: "1em" }}>
              <Header as="h3">Diagnoses</Header>
            </Grid.Column>
          )}
          <Grid.Column width={7}>
            <Header as="h3">Discharge</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginTop: "-1em" }}>
          <Grid.Column width={8} style={{ marginRight: "1em" }}>
            <List>
              {entry.diagnoses?.map((diagnosis, index) => (
                <List.Item
                  key={index}
                  style={{ fontWeight: "bold", color: "grey" }}
                >
                  {diagnosis.code} - {diagnosis.name}
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Container style={{ fontWeight: "bold", color: "grey" }}>
              On {entry.discharge.date}
            </Container>
            <Container style={{ fontWeight: "bold", color: "grey" }}>
              {entry.discharge.criteria}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default HospitalEntryDetails;
