import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../styles/MiddleBottomDashboard.module.css';
import api from '../services/api';
import { useBetsStore } from '../stores/betStore';
import { Bet } from '../interfaces/bet.interface';
import { Event } from '../interfaces/event.interface';

const MiddleBottomDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [competitionName, setCompetitionName] = useState<string>('Ligue 1');
  const bets = useBetsStore((state) => state.bets);
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const { addBetToBets } = useBetsStore();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get('/events', {
        params: { competitionName },
      });
      if (response.data && response.data.length > 0) {
        setEvents(response.data[0].matches);
      }
    };

    fetchEvents();
  }, [competitionName]);

  const addEventsToBets = (bet: Bet) => {
    const existingBet = bets.find(
      (existingBet) => existingBet.eventId == bet.eventId
    );

    if (!existingBet) {
      addBetToBets(bet);
    }
  };

  const handleCompetitionChange = (event: SelectChangeEvent<string>) => {
    setCompetitionName(event.target.value);
  };

  return (
    <>
      <Stack direction="row" justifyContent="flex-start">
        <FormControl
          sx={{
            m: 2,
            minWidth: 200,
            border: '1px olid #00A0F7',
            borderRadius: '5px',
          }}
          size="small"
        >
          <Select
            value={competitionName}
            onChange={handleCompetitionChange}
            variant="outlined"
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSvgIcon-root ': {
                fill: 'white !important',
              },
            }}
          >
            <MenuItem value="Ligue 1">Ligue 1</MenuItem>
            <MenuItem value="European Championship">
              European Championship
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack
        className={styles.middleBottomDashboard}
        sx={{
          height: !isMdScreen ? 'calc(100vh - 330px)' : 'calc(100vh - 40px)',
        }}
      >
        <Stack direction="row">
          <TableContainer
            className={styles.tableContainer}
            component={Paper}
            sx={{
              height: !isMdScreen
                ? 'calc(100vh - 340px)'
                : 'calc(100vh - 40px)',
              width: '100%',
              borderRadius: '20px',
              overflowX: 'scroll',
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {isMdScreen && (
                    <TableCell align="center" sx={{ borderBottom: 'none' }}>
                      Schedule
                    </TableCell>
                  )}

                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    Home
                  </TableCell>
                  {isSmScreen && (
                    <TableCell align="center" sx={{ borderBottom: 'none' }}>
                      1
                    </TableCell>
                  )}

                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    X
                  </TableCell>

                  {isSmScreen && (
                    <TableCell align="center" sx={{ borderBottom: 'none' }}>
                      2
                    </TableCell>
                  )}

                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    Away
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.length > 0 &&
                  events?.map((event: Event) => (
                    <TableRow key={event.id}>
                      {isMdScreen && (
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ borderBottom: 'none' }}
                        >
                          {event.utcDate.split('T')[0]}
                        </TableCell>
                      )}
                      <TableCell
                        align="center"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottom: 'none',
                          flexDirection: !isSmScreen ? 'column' : 'row',
                        }}
                      >
                        {isLgScreen && (
                          <Typography
                            variant="caption"
                            sx={{ marginRight: '10px', width: '150px' }}
                          >
                            {isLgScreen
                              ? event.homeTeam.name
                              : event.homeTeam.tla}{' '}
                          </Typography>
                        )}
                        <img
                          src={event.homeTeam.crest}
                          alt="home_team_logo"
                          width="50px"
                          style={{ marginBottom: !isSmScreen ? '5px' : '0' }}
                        />
                        {!isSmScreen && (
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
                        )}
                      </TableCell>
                      {isSmScreen && (
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
                      )}
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

                      {isSmScreen && (
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
                      )}
                      <TableCell
                        align="center"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottom: 'none',
                          flexDirection: !isSmScreen ? 'column' : 'row',
                        }}
                      >
                        {isLgScreen && (
                          <Typography
                            variant="caption"
                            sx={{ marginRight: '10px', width: '150px' }}
                          >
                            {isLgScreen
                              ? event.awayTeam.name
                              : event.awayTeam.tla}{' '}
                          </Typography>
                        )}
                        <img
                          src={event.awayTeam.crest}
                          alt="home_team_logo"
                          width="50px"
                          style={{ marginBottom: !isSmScreen ? '5px' : '0' }}
                        />
                        {!isSmScreen && (
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
                                  odd: event.odds.homeWin,
                                  team: 'AWAY_TEAM',
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
                        )}
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
