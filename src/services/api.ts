import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BETFLOW_API_URL}/api/v1`,
});

export default api;
