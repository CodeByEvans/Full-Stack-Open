import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry } from "../../../types";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <h2>
        {entry.date} <LocalHospitalIcon />
      </h2>
      <p>{entry.description}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntryDetails;
