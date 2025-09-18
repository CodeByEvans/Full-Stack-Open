import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import patientService from "../../services/patients";

import { Patient } from "../../types";
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
      <pre>{JSON.stringify(patient.entries, null, 2)}</pre>
    </div>
  );
};

export default PatientDetails;
