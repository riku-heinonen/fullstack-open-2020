import { Button, Grid } from "semantic-ui-react";
import { Diagnosis, EntryType, HealthCheckRating } from "../types";
import {
  DiagnosisSelection,
  EntryTypeOption,
  NumberField,
  SelectField,
  TextField,
} from "./FormField";
import { Field, Form, Formik } from "formik";

import React from "react";
import { useStateValue } from "../state";

export interface EntryFormValues {
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  dischargeDate?: string;
  dischargeCriteria?: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
  healthCheckRating?: HealthCheckRating;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "HealthCheck", label: "Health Check" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        sickLeaveStartDate: "",
        sickLeaveEndDate: "",
        healthCheckRating: undefined,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const bothRequiredError =
          "Both or neither sick leave dates must be filled in.";
        const outOfRangeError =
          "Health rating out of range, should be between 0 and 3";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type === "Hospital") {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        } else if (values.type === "HealthCheck") {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          } else {
            if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
              errors.healthCheckRating = outOfRangeError;
            }
          }
        } else if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeaveStartDate && !values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = bothRequiredError;
          }
          if (values.sickLeaveEndDate && !values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = bothRequiredError;
          }
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryTypeOptions} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM_DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === "HealthCheck" && (
              <>
                <Field
                  label="Health rating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              </>
            )}
            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStartDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEndDate"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
