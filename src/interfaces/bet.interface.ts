export interface Bet {
  team: string;
  awayTeam: string;
  homeTeam: string;
  odd: number;
  stake?: number;
  endDateEvent: string;
  eventId: number;
}
