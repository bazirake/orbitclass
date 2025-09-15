import axios from "axios";

export const api = axios.create({ baseURL: "https://orbitclassdb.onrender.com",withCredentials:true });
