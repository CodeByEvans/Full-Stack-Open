import { HealthCheckEntry } from "../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const HealthCheckEntryDetails = (entry: HealthCheckEntry) => {
  return (
    <div>
      <p>
        {entry.date} <MonitorHeartIcon />
      </p>
    </div>
  );
};
