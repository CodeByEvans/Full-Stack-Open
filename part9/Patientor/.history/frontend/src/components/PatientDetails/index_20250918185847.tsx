import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";

import { Diagnose, Entry, Patient } from "../../types";
import { useEffect, useState } from "react";
import EntryDetails from "../EntryDetails";
import AddEntryForm from "../AddEntryForm";
import { Button, Typography, Box, Divider } from "@mui/material";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(setPatient);
    }
    diagnoseService.getAll().then(setDiagnoses);
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h4">
          {patient.name}{" "}
          {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
        <Typography variant="body1">SSN: {patient.ssn}</Typography>
        <Typography variant="body1">
          Occupation: {patient.occupation}
        </Typography>
      </Box>

      <Divider />

      <Box mt={2} mb={2}>
        <Typography variant="h5">Entries</Typography>
        {patient.entries.length === 0 ? (
          <Typography>No entries available.</Typography>
        ) : (
          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {patient.entries.map((entry: Entry) => (
              <li key={entry.id}>
                <EntryDetails
                  entry={entry}
                  diagnoses={
                    entry.diagnosisCodes
                      ? diagnoses.filter((d) =>
                          entry.diagnosisCodes?.includes(d.code)
                        )
                      : []
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Button
        variant="contained"
        color={showAddEntryForm ? "secondary" : "primary"}
        onClick={() => setShowAddEntryForm(!showAddEntryForm)}
      >
        {showAddEntryForm ? "Cancel" : "Add New Entry"}
      </Button>

      {showAddEntryForm && (
        <Box mt={2}>
          <AddEntryForm
            patientId={patient.id}
            onAddEntry={(entry) =>
              setPatient({ ...patient, entries: [...patient.entries, entry] })
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default PatientDetails;
