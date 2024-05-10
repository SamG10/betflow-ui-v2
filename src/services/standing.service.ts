import api from './api';

export const fetchLigue1Standing = async () => {
  const response = await api.get('/standings');
  return response?.data;
};
