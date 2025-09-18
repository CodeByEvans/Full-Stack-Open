import { Diagnose, Entry } from "../../types";
import HealthCheckEntryDetails from "./HealtCheckEntry";
import HospitalEntryDetails from "./HospitalEntry";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntry";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnose[] }> = ({
  entry,
}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails {...entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
