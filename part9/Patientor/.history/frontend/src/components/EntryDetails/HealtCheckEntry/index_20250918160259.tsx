import { HealthCheckEntry } from "../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const HealthCheckEntryDetails = (entry: HealthCheckEntry) => {
  return (
    <div>
      <h2>
        {entry.date} <MonitorHeartIcon />
      </h2>
    </div>
  );
};
