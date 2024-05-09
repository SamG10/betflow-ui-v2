import api from './api';

export const fetchSaveBets = async (betsToSave) => {
  const access_token = localStorage.getItem('access_token');

  await api.post('/bets', betsToSave, {
    headers: {
      Authorization: `Bearer ${access_token} `,
    },
  });
};
