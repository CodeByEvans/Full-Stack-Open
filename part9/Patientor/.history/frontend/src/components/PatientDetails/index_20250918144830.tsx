import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import patientService from "../../services/patients";

import { Entry, Patient } from "../../types";
import { useEffect, useState } from "react";

interface PatientDetailsProps {
  patients: Patient[];
}

const PatientDetails = ({ patients }: PatientDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const localPatient = patients.find((p) => p.id === id);
      if (localPatient) {
        setPatient(localPatient);
      } else {
        // pedir al backend
        patientService.getById(id).then(setPatient);
      }
    }
  }, [id, patients]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}{" "}
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
            <li key={entry.id}>
              <h4>{entry.date}</h4>
              <p>{entry.description}</p>
              <p>Specialist: {entry.specialist}</p>
              <p>Diagnosis: {entry.diagnosisCodes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetails;
