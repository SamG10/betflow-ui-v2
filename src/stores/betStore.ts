import { create } from 'zustand';
import { Bet } from '../interfaces/bet.interface';

type BetState = {
  bets: Bet[];
  addBetToBets: (bet: Bet) => void;
  deleteBetFromBets: (bet: Bet) => void;
  deleteAllBets: () => void;
};

export const useBetsStore = create<BetState>((set) => ({
  bets: [],
  addBetToBets: (bet: Bet) =>
    set((state) => {
      return {
        bets: [...state.bets, bet],
      };
    }),
  deleteBetFromBets: (bet: Bet) =>
    set((state) => ({
      bets: state.bets.filter((existingBet) => existingBet !== bet),
    })),
  deleteAllBets: () =>
    set(() => ({
      bets: [],
    })),
}));
