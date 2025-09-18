import { HospitalEntry, Diagnose } from "../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Card, CardContent, Typography, Box } from "@mui/material";

const HospitalEntryDetails = ({
  entry,
  diagnoses = [],
}: {
  entry: HospitalEntry;
  diagnoses?: Diagnose[];
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography>{entry.description}</Typography>
        <Typography>
          Discharge: {entry.discharge.date} — {entry.discharge.criteria}
        </Typography>
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

export default HospitalEntryDetails;
