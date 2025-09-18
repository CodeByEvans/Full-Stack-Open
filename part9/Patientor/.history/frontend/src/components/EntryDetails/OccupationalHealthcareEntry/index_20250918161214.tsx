import { OccupationalHealthcareEntry } from "../../../types";

import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <h2>
        {entry.date} <MedicalInformationIcon />{" "}
      </h2>
      <p>{entry.description}</p>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave && (
        <div>
          <p>Sick leave:</p>
          <p>Start date: {entry.sickLeave.startDate}</p>
          <p>End date: {entry.sickLeave.endDate}</p>
        </div>
      )}
      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
