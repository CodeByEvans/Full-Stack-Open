import { HealthCheckEntry } from "../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import HealthRating from "./HealthRating";

const HealthCheckEntryDetails = (entry: HealthCheckEntry) => {
  return (
    <div>
      <h2>
        {entry.date} <MonitorHeartIcon />
      </h2>
      <p>{entry.description}</p>
      {entry.type === "HealthCheck" && (
        <div>
          <HealthRating rating={entry.healthCheckRating} />
        </div>
      )}
      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryDetails;
