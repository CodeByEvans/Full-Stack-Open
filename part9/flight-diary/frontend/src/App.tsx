import { useEffect, useState } from "react";
import { getAllDiaries } from "./diary.service";
import type { DiaryEntry } from "./types";
import AddDiaryForm from "./components/AddDiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  // get all diaries
  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setFormOpen(!formOpen)}>
          {formOpen ? "Close form" : "Open form"}
        </button>
        {formOpen && <AddDiaryForm setDiaries={setDiaries} />}
      </div>
      <div>
        <h2>Diary entries</h2>
        {diaries.map((d) => (
          <div key={d.id}>
            <h3>{d.date}</h3>
            <p>visibility: {d.visibility}</p>
            <p>weather: {d.weather}</p>
            <p>{d.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
