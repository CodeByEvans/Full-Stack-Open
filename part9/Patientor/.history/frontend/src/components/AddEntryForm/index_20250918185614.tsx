import { useState } from "react";
import { Entry, HealthCheckRating } from "../../types";
import patientService from "../../services/patients";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
} from "@mui/material";

interface AddEntryFormProps {
  patientId: string;
  onAddEntry: (entry: Entry) => void;
}

const AddEntryForm = ({ patientId, onAddEntry }: AddEntryFormProps) => {
  const [type, setType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newEntry: Omit<Entry, "id">;

    switch (type) {
      case "HealthCheck":
        newEntry = { type, date, specialist, description, healthCheckRating };
        break;
      case "Hospital":
        newEntry = {
          type,
          date,
          specialist,
          description,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          type,
          date,
          specialist,
          description,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        };
        break;
      default:
        throw new Error("Unknown entry type");
    }

    try {
      const addedEntry = await patientService.addEntry(patientId, newEntry);
      onAddEntry(addedEntry);

      // limpiar campos
      setDate("");
      setSpecialist("");
      setDescription("");
      setHealthCheckRating(0);
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <MenuItem value="HealthCheck">HealthCheck</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">
                OccupationalHealthcare
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />
        </Grid>

        {type === "HealthCheck" && (
          <Grid item xs={12}>
            <TextField
              label="Health Rating (0-3)"
              type="number"
              inputProps={{ min: 0, max: 3 }}
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
        )}

        {type === "Hospital" && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Discharge Date"
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Discharge Criteria"
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Employer Name"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Sick Leave Start"
                type="date"
                value={sickLeaveStart}
                onChange={(e) => setSickLeaveStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Sick Leave End"
                type="date"
                value={sickLeaveEnd}
                onChange={(e) => setSickLeaveEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
