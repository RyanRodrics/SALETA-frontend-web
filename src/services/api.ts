import axios, { type AxiosInstance } from "axios";

//export const API_URL = 'http://localhost:3333';
//export const API_URL = 'https://saleta-backend.vercel.app';
export const API_URL = 'https://saleta-backend.lostbytes.me';
//export const API_URL = 'http://192.168.3.74:3333'

const api: AxiosInstance = axios.create({
    baseURL:API_URL

});

export default api;