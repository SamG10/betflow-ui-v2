import api from './api';

export const fetchSaveBets = (betsToSave) => {
  const access_token = localStorage.getItem('access_token');

  try {
    api.post('/bets', betsToSave, {
      headers: {
        Authorization: `Bearer ${access_token} `,
      },
    });
  } catch (error) {
    console.log('error');
  }
};
