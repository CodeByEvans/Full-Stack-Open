import { useState } from "react";
import { Entry, HealthCheckRating } from "../../types";
import patientService from "../../services/patients";

interface AddEntryFormProps {
  patientId: string;
  onAddEntry: (entry: Entry) => void;
}

const AddEntryForm = ({ patientId, onAddEntry }: AddEntryFormProps) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: Omit<Entry, "id"> = {
      type: "HealthCheck",
      date,
      specialist,
      description,
      healthCheckRating,
    };

    try {
      const addedEntry = await patientService.addEntry(patientId, newEntry);
      onAddEntry(addedEntry); // actualizar estado en la página
      setDate("");
      setSpecialist("");
      setDescription("");
      setHealthCheckRating(0);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add HealthCheck Entry</h4>
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
      <div>
        <label>Health Rating:</label>
        <input
          type="number"
          min={0}
          max={3}
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
