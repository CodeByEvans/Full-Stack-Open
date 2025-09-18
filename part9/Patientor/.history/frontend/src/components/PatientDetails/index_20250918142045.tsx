import { useParams } from "react-router-dom";

import { Patient } from "../../types";

interface PatientDetailsProps {
  patients: Patient[];
}

const PatientDetails = ({ patients }: PatientDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients.find((p) => p.id === id)!;

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <pre>{JSON.stringify(patient.entries, null, 2)}</pre>
    </div>
  );
};

export default PatientDetails;
