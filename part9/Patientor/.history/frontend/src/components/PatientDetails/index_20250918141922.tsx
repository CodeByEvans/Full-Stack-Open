
import { useState } from "react";

import { Patient } from "../../types";

const PatientDetails = ({patients: Patient[]}) => {
  const [patient, setPatient] = useState<Patient | null>(null);


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
