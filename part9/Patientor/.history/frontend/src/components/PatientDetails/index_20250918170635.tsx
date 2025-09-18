import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";

import { Diagnose, Entry, Patient } from "../../types";
import { useEffect, useState } from "react";
import EntryDetails from "../EntryDetails";

interface PatientDetailsProps {
  patients: Patient[];
}

const PatientDetails = ({ patients }: PatientDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(setPatient);
    }
    diagnoseService.getAll().then(setDiagnoses);
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        <ul>
          {patient.entries.map((entry: Entry) => (
            <EntryDetails
              key={entry.id}
              entry={entry}
              diagnoses={
                entry.diagnosisCodes
                  ? diagnoses.filter((d) =>
                      entry.diagnosisCodes?.includes(d.code)
                    )
                  : []
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetails;
