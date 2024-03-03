import axios from "axios";
import { AxiosError } from "axios";

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const isAxiosError = (error: unknown): error is AxiosError =>
  (error as AxiosError).isAxiosError !== undefined;
