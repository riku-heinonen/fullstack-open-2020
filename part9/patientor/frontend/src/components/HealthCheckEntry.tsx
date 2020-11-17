import React from "react";
import { Grid, Header, Icon, List, Segment } from "semantic-ui-react";
import { Diagnosis, HealthCheckEntry } from "../types";
import HealthRatingBar from "./HealthRatingBar";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry & { diagnoses?: Diagnosis[] };
}

const HealthCheckEntryDetails: React.FC<HealthCheckEntryProps> = ({
  entry,
}) => {
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
          <Grid.Column width={8} style={{ marginRight: "1em" }}>
            <Header as="h3">Diagnoses</Header>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h3">Health Rating</Header>
          </Grid.Column>
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
          <Grid.Column width={7}>
            <HealthRatingBar
              rating={entry.healthCheckRating}
              showText={false}
            ></HealthRatingBar>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default HealthCheckEntryDetails;
