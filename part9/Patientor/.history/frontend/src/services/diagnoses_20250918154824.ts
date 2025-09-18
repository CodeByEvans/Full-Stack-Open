import axios from "axios";
import { Diagnose } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Diagnose[]> => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default { getAll };
