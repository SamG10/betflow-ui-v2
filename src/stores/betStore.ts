import { create } from 'zustand';
import { Bet } from '../interfaces/bet.interface';

// const store = (set, get) => ({
//   bets: [],

//   addBets: (bet) =>
//     set(
//       produce((state: any) => {
//         console.log('in store');

// if (get().bets.some((e) => bet.eventId === e.eventId)) {
//   const index = get().bets.findIndex((t) => t.eventId === bet.eventId);

//   get().bets.splice(index, 1);
// } else {
//   state.bets.push(bet);
// }

//         // if (bets.some((e) => bet.eventId === e.eventId)) {
//         //     const index = bets.findIndex((t) => t.eventId === bet.eventId);

//         //     bets.splice(index, 1);

//         //     setBets([...bets]);
//         //   } else {
//         //     setBets((oldBet) => [...oldBet, bet]);
//         //   }
//       })
//     ),
// });

// const useStore = create(
//   devtools(subscribeWithSelector(store), { name: 'BetStore' })
// );

// export default useStore;

type BetState = {
  bets: Bet[];
  addBetToBets: (bet: Bet) => void;
  deleteBetFromBets: (bet: Bet) => void;
};

export const useBetsStore = create<BetState>((set) => ({
  bets: [],
  addBetToBets: (bet: Bet) =>
    set((state) => ({
      bets: [...state.bets, bet],
    })),
  deleteBetFromBets: (bet: Bet) =>
    set((state) => ({
      bets: state.bets.filter((existingBet) => existingBet !== bet),
    })),
}));
