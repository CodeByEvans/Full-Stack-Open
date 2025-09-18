import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const basteUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(basteUrl).then((response) => response.data);
};

export const addDiary = (entry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(basteUrl, entry)
    .then((response) => response.data);
};
