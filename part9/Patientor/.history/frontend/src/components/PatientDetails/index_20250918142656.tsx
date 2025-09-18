import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import { Patient } from "../../types";

interface PatientDetailsProps {
  patients: Patient[];
}

const PatientDetails = ({ patients }: PatientDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients.find((p) => p.id === id)!;

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
