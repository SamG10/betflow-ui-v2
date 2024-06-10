export interface Bet {
  eventId: number;
  odd: number;
  team: 'HOME_TEAM' | 'DRAW' | 'AWAY_TEAM';
  endDateEvent: string;
  homeTeamOdd: number;
  awayTeamOdd: number;
  drawTeamOdd: number;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  eventDate: string;
}
