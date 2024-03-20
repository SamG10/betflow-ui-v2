export interface Event {
  area: {
    code: string;
    flag: string;
    id: number;
    name: string;
  };
  awayTeam: {
    crest: string;
    id: number;
    name: string;
    shortName: string;
    tla: string;
  };
  competition: {
    code: string;
    emblem: string;
    id: number;
    name: string;
    type: string;
  };
  group: string | null;
  homeTeam: {
    crest: string;
    id: number;
    name: string;
    shortName: string;
    tla: string;
  };
  id: number;
  lastUpdated: string;
  matchDay: number;
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  referee: {
    id: number;
    name: string;
    nationality: string;
    type: string;
  }[];
  score: {
    duration: string;
    fullTime: {
      away: number;
      home: number;
    };
    halfTime: {
      away: number;
      home: number;
    };
    winner: string;
  };
  season: {
    currentMatchday: number;
    endDate: string;
    id: number;
    startDate: string;
    winner: null;
  };
  stage: string;
  status: string;
  utcDate: string;
}
