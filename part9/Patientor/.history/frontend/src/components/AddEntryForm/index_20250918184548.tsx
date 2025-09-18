import { useState } from "react";
import { Entry, HealthCheckRating } from "../../types";
import patientService from "../../services/patients";

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

    let newEntry:
      | Omit<Entry, "id">
      | Omit<Extract<Entry, { type: "HealthCheck" }>, "id">
      | Omit<Extract<Entry, { type: "Hospital" }>, "id">
      | Omit<Extract<Entry, { type: "OccupationalHealthcare" }>, "id">;

    switch (type) {
      case "HealthCheck":
        newEntry = {
          type,
          date,
          specialist,
          description,
          healthCheckRating,
        };
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

      // Limpiar campos
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
      <h4>Add Entry</h4>

      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="HealthCheck">HealthCheck</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">OccupationalHealthcare</option>
        </select>
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Specialist:</label>
        <input
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {type === "HealthCheck" && (
        <div>
          <label>Health Rating (0-3):</label>
          <input
            type="number"
            min={0}
            max={3}
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            required
          />
        </div>
      )}

      {type === "Hospital" && (
        <>
          <div>
            <label>Discharge Date:</label>
            <input
              type="date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Discharge Criteria:</label>
            <input
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              required
            />
          </div>
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <div>
            <label>Employer Name:</label>
            <input
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Sick Leave Start:</label>
            <input
              type="date"
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
            />
          </div>
          <div>
            <label>Sick Leave End:</label>
            <input
              type="date"
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
            />
          </div>
        </>
      )}

      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
