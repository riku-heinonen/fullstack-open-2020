import React from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  List,
  Segment,
} from "semantic-ui-react";
import { Diagnosis, OccupationalHealthcareEntry } from "../types";

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthcareEntry & { diagnoses?: Diagnosis[] };
}

const OccupationalHealthCareEntryDetails: React.FC<OccupationalHealthCareEntryProps> = ({
  entry,
}) => {
  return (
    <Segment>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={1} style={{ marginRight: "1em" }}>
            <Icon size="huge" name="user md" float="left" />
          </Grid.Column>
          <Grid.Column width={7} verticalAlign="middle">
            <Header>{entry.date}</Header>
            <Header as="h5" style={{ color: "grey", marginTop: "-0.75em" }}>
              {entry.description}
            </Header>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h3">Employer</Header>
            <Container
              style={{ fontSize: "1.5em", fontWeight: "bold", color: "grey" }}
            >
              {entry.employerName}
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} style={{ marginRight: "1em" }}>
            <Header as="h3">Diagnoses</Header>
          </Grid.Column>
          {entry.sickLeave !== undefined && (
            <Grid.Column width={7}>
              <Header as="h3">Sick leave</Header>
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row style={{ marginTop: "-1em" }}>
          <Grid.Column width={8} style={{ marginRight: "1em" }}>
            {entry.diagnoses ? (
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
            ) : (
              <Header as="h4" style={{ color: "grey" }}>
                No diagnoses
              </Header>
            )}
          </Grid.Column>
          {entry.sickLeave !== undefined && (
            <Grid.Column width={7}>
              <Header as="h3" style={{ color: "grey" }}>
                from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Header>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default OccupationalHealthCareEntryDetails;
