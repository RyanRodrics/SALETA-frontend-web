import axios, { type AxiosInstance } from "axios";

export const API_URL = 'http://localhost:3333';
//export const API_URL = 'https://saleta-backend.vercel.app';
//export const API_URL = 'https://saleta-backend.lostbytes.me';
//export const API_URL = 'http://192.168.3.74:3333'

const api: AxiosInstance = axios.create({
    baseURL:API_URL

});


api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('authToken');
    
    
    // Se o token existir, adiciona o cabeçalho de Authorization
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    
    return config; // Retorna a configuração para o Axios continuar a requisição
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, apenas a retorna
    return response;
  },
  (error) => {
    // Verifica se o erro é de autenticação (401)
    if (error.response && error.response.status === 401) {
      console.warn('Sessão expirada. Redirecionando para o login.');
      // Limpa o token do localStorage
      localStorage.removeItem('authToken');
    }
    
    // Rejeita a promessa para que o erro possa ser tratado localmente se necessário
    return Promise.reject(error);
  }
);

export default api;