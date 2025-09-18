import { OccupationalHealthcareEntry, Diagnose } from "../../../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { Card, CardContent, Typography, Box } from "@mui/material";

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses = [],
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses?: Diagnose[];
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {entry.date} <MedicalInformationIcon />
        </Typography>
        <Typography>{entry.description}</Typography>
        <Typography>Employer: {entry.employerName}</Typography>
        {entry.sickLeave && (
          <Box mt={1}>
            <Typography variant="subtitle2">Sick leave:</Typography>
            <Typography>Start: {entry.sickLeave.startDate}</Typography>
            <Typography>End: {entry.sickLeave.endDate}</Typography>
          </Box>
        )}
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

export default OccupationalHealthcareEntryDetails;
