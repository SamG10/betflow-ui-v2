import api from './api';

interface BetToSave {
  stake: number;
  odd: number;
  team: string;
  endDateEvent: string;
  eventId: number;
  homeTeamOdd: number;
  drawTeamOdd: number;
  awayTeamOdd: number;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  eventDate: string;
}

export const fetchSaveBets = async (betsToSave: BetToSave[]) => {
  console.log('betsToSave', betsToSave);

  const access_token = localStorage.getItem('access_token');

  await api.post(
    '/bets',
    { bets: betsToSave },
    {
      headers: {
        Authorization: `Bearer ${access_token} `,
      },
    }
  );
};
