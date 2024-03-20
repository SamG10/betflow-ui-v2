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
  const [bets, setBets] = useState([]);

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

  console.log('events', events);

  const addEventsToBets = (bet: Bet) => {
    addBetToBets(bet);
    // if (bets.some((e) => bet.eventId === e.eventId)) {
    //   const index = bets.findIndex((t) => t.eventId === bet.eventId);
    //   bets.splice(index, 1);
    //   setBets([...bets]);
    // } else {
    //   setBets((oldBet) => [...oldBet, bet]);
    // }
  };

  return (
    <>
      <Stack className={styles.middleBottomDashboard} height="55vh">
        <Stack direction="row">
          <TableContainer
            className={styles.tableContainer}
            component={Paper}
            sx={{
              height: '450px',
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
                {events?.map((event: Event) => (
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
                        onClick={() =>
                          addEventsToBets({
                            eventId: event.id,
                            odds: event.odds.homeWin,
                            team: 'HOME_TEAM',
                            homeTeam: event.homeTeam.name,
                            awayTeam: event.awayTeam.name,
                            endDateEvent: event.lastUpdated,
                          })
                        }
                      >
                        {event.odds.homeWin}
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
                        onClick={() =>
                          addEventsToBets({
                            eventId: event.id,
                            odds: event.odds.draw,
                            team: 'DRAW',
                            homeTeam: event.homeTeam.name,
                            awayTeam: event.awayTeam.name,
                            endDateEvent: event.lastUpdated,
                          })
                        }
                      >
                        {event.odds.draw}
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
                        onClick={() =>
                          addEventsToBets({
                            eventId: event.id,
                            odds: event.odds.awayWin,
                            team: 'AWAY_TEAM',
                            homeTeam: event.homeTeam.name,
                            awayTeam: event.awayTeam.name,
                            endDateEvent: event.lastUpdated,
                          })
                        }
                      >
                        {event.odds.awayWin}
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
