import { HealthCheckEntry, Diagnose } from "../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Card, CardContent, Typography, Box } from "@mui/material";
import HealthRating from "./HealthRating";

const HealthCheckEntryDetails = ({
  entry,
  diagnoses = [],
}: {
  entry: HealthCheckEntry;
  diagnoses?: Diagnose[];
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {entry.date} <MonitorHeartIcon />
        </Typography>
        <Typography>{entry.description}</Typography>
        <Box mt={1}>
          <HealthRating rating={entry.healthCheckRating} />
        </Box>
        {diagnoses.length > 0 && (
          <Box mt={1}>
            <Typography variant="subtitle2">Diagnoses:</Typography>
            <ul>
              {diagnoses.map((d) => (
                <li key={d.code}>
                  {d.code}: {d.name}
                </li>
              ))}
            </ul>
          </Box>
        )}
        <Typography mt={1}>Diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetails;
