import { useState } from "react";
import type { DiaryEntry, NewDiaryEntry } from "../types";
import { addDiary } from "../diary.service";
import React from "react";
import axios from "axios";

const AddDiaryForm = ({
  setDiaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [form, setForm] = useState<NewDiaryEntry>({
    date: "",
    visibility: "great",
    weather: "sunny",
    comment: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEntry = await addDiary(form);
      setDiaries((prev) => [...prev, newEntry]);
      setForm({
        date: "",
        visibility: "great",
        weather: "sunny",
        comment: "",
      });
      setError(null); // limpia error anterior
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.error) {
          setError(e.response.data.error);
        } else {
          setError("Error desconocido del servidor");
        }
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>❌ {error}</div>
        )}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Visibility:</label>
          {["great", "good", "ok", "poor"].map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={form.visibility === v}
                onChange={handleChange}
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          <label>Weather:</label>
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={form.weather === w}
                onChange={handleChange}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Entry</button>
      </form>
    </>
  );
};

export default AddDiaryForm;
