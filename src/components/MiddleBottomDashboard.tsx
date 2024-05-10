import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../styles/MiddleBottomDashboard.module.css';
import api from '../services/api';
import { useBetsStore } from '../stores/betStore';
import { Bet } from '../interfaces/bet.interface';
import { Event } from '../interfaces/event.interface';

const MiddleBottomDashboard: React.FC = () => {
  const [events, setEvents] = useState([]);
  const bets = useBetsStore((state) => state.bets);

  const { addBetToBets } = useBetsStore();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get('/events');
      if (response.data && response.data.length > 0) {
        setEvents(response.data[0].matches);
      }
    };

    fetchEvents();
  }, []);

  const addEventsToBets = (bet) => {
    console.log('bet', bet);
    console.log('bets', bets);

    const existingBet = bets.find(
      (existingBet) => existingBet.eventId == bet.eventId
    );
    console.log('existingBet', existingBet);

    if (!existingBet) {
      addBetToBets(bet);
    }
  };

  return (
    <>
      <Stack className={styles.middleBottomDashboard} height="auto">
        <Stack direction="row">
          <TableContainer
            className={styles.tableContainer}
            component={Paper}
            sx={{
              height: '410px',
              width: '100%',
              borderRadius: '20px',
              overflowX: 'scroll',
            }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    Schedule
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    Home
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    1
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    X
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    2
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    Away
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.length > 0 &&
                  events?.map((event: Event) => (
                    <TableRow key={event.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ borderBottom: 'none' }}
                      >
                        {event.utcDate.split('T')[0]}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottom: 'none',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ marginRight: '10px', width: '150px' }}
                        >
                          {event.homeTeam.name}
                        </Typography>
                        <img
                          src={event.homeTeam.crest}
                          alt="home_team_logo"
                          width="50px"
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: 'none' }}>
                        <Button
                          variant={
                            bets[
                              bets.findIndex(
                                (bet: Bet) => bet.eventId === event.id
                              )
                            ]?.team === 'HOME_TEAM'
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => {
                            if (event.odds.homeWin) {
                              addEventsToBets({
                                eventId: event.id,
                                odd: event.odds.homeWin,
                                team: 'HOME_TEAM',
                                homeTeam: event.homeTeam.name,
                                awayTeam: event.awayTeam.name,
                                endDateEvent: event.lastUpdated,
                                homeTeamOdd: event.odds.homeWin,
                                awayTeamOdd: event.odds.awayWin,
                                drawTeamOdd: event.odds.draw,
                                homeTeamName: event.homeTeam.name,
                                awayTeamName: event.awayTeam.name,
                                homeTeamLogo: event.homeTeam.crest,
                                awayTeamLogo: event.awayTeam.crest,
                                eventDate: event.utcDate,
                              });
                            }
                          }}
                        >
                          {event.odds.homeWin ?? 'X'}
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: 'none' }}>
                        <Button
                          variant={
                            bets[
                              bets.findIndex(
                                (bet: Bet) => bet.eventId === event.id
                              )
                            ]?.team === 'DRAW'
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => {
                            if (event.odds.homeWin) {
                              addEventsToBets({
                                eventId: event.id,
                                odd: event.odds.draw,
                                team: 'DRAW',
                                homeTeam: event.homeTeam.name,
                                awayTeam: event.awayTeam.name,
                                endDateEvent: event.lastUpdated,
                                homeTeamOdd: event.odds.homeWin,
                                awayTeamOdd: event.odds.awayWin,
                                drawTeamOdd: event.odds.draw,
                                homeTeamName: event.homeTeam.name,
                                awayTeamName: event.awayTeam.name,
                                homeTeamLogo: event.homeTeam.crest,
                                awayTeamLogo: event.awayTeam.crest,
                                eventDate: event.utcDate,
                              });
                            }
                          }}
                        >
                          {event.odds.draw ?? 'X'}
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: 'none' }}>
                        <Button
                          variant={
                            bets[
                              bets.findIndex(
                                (bet: Bet) => bet.eventId === event.id
                              )
                            ]?.team === 'AWAY_TEAM'
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => {
                            if (event.odds.homeWin) {
                              addEventsToBets({
                                eventId: event.id,
                                odd: event.odds.awayWin,
                                team: 'AWAY_TEAM',
                                homeTeam: event.homeTeam.name,
                                awayTeam: event.awayTeam.name,
                                endDateEvent: event.lastUpdated,
                                homeTeamOdd: event.odds.homeWin,
                                awayTeamOdd: event.odds.awayWin,
                                drawTeamOdd: event.odds.draw,
                                homeTeamName: event.homeTeam.name,
                                awayTeamName: event.awayTeam.name,
                                homeTeamLogo: event.homeTeam.crest,
                                awayTeamLogo: event.awayTeam.crest,
                                eventDate: event.utcDate,
                              });
                            }
                          }}
                        >
                          {event.odds.awayWin ?? 'X'}
                        </Button>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottom: 'none',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ marginRight: '10px', width: '150px' }}
                        >
                          {event.awayTeam.name}
                        </Typography>
                        <img
                          src={event.awayTeam.crest}
                          alt="home_team_logo"
                          width="50px"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </>
  );
};

export default MiddleBottomDashboard;
