import axios from "axios";
import { useState } from "react";
import useAuth from "./../hooks/useAuth";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
