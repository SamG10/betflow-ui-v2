import React, { useEffect, useState } from 'react';
import { getUserBets } from '../services/users.service';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

interface Bet {
  _id: string;
  eventId: string;
  competitionName: string;
  eventDate: string;
  homeTeamName: string;
  homeTeamLogo: string;
  homeTeamOdd: number;
  drawTeamOdd: number;
  awayTeamOdd: number;
  awayTeamName: string;
  awayTeamLogo: string;
  scoreHome: number;
  scoreAway: number;
  odd: number;
  status: string;
  betResult?: string;
  stake: number;
  payed: boolean;
  coinsGain: number;
}

const MyBets: React.FC = () => {
  const [bets, setBets] = useState<Bet[] | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchUserBets = async () => {
      try {
        const bets = await getUserBets();
        setBets(bets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserBets();
  }, []);

  return (
    <>
      <Box sx={{ overflow: 'auto', maxHeight: '100vh' }}>
        <Grid container spacing={2}>
          {bets?.map((bet, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: '16px',
                  bgcolor: theme.palette.background.paper,
                  borderRadius: '16px',
                }}
              >
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="space-between"
                  alignItems={'center'}
                >
                  <Typography
                    variant="caption"
                    flexWrap="wrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    textAlign="start"
                    width="80px"
                  >
                    {bet?.competitionName}
                  </Typography>
                  <Stack
                    direction="column"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100px"
                  >
                    <Typography variant="caption" textAlign="center">
                      {bet?.eventDate.split('T')[0]}
                    </Typography>
                    <Typography variant="caption" textAlign="center">
                      {bet?.eventDate.split('T')[1].substring(0, 8)}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    flexWrap="wrap"
                    textAlign="end"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    width="80px"
                  >
                    {bet.status.toLowerCase()}
                  </Typography>
                </Stack>
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Stack
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img
                        src={bet.homeTeamLogo}
                        alt="home_team_logo"
                        width="50px"
                        height="50px"
                      />
                      <Typography
                        variant="body1"
                        width="70px"
                        textAlign="center"
                        mb={1}
                        mt={1}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {bet.homeTeamName}
                      </Typography>
                      <Button
                        variant={
                          bet.odd === bet.homeTeamOdd ? 'contained' : 'outlined'
                        }
                      >
                        {bet.homeTeamOdd}
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5" fontWeight="bold" mb={1}>
                        {bet.scoreHome} - {bet.scoreAway}
                      </Typography>
                      <Button
                        variant={
                          bet.odd === bet.drawTeamOdd ? 'contained' : 'outlined'
                        }
                      >
                        {bet.drawTeamOdd}
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img
                        src={bet.awayTeamLogo}
                        alt="away_team_logo"
                        width="50px"
                        height="50px"
                      />
                      <Typography
                        variant="body1"
                        textAlign="center"
                        mb={1}
                        mt={1}
                        width="70px"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {bet.awayTeamName}
                      </Typography>
                      <Button
                        variant={
                          bet.odd === bet.awayTeamOdd ? 'contained' : 'outlined'
                        }
                      >
                        {bet.awayTeamOdd}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-around"
                  alignItems="center"
                  mt={2}
                >
                  <Grid item xs={6}>
                    <Stack
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body2" mb={1}>
                        Stake
                      </Typography>
                      <Button variant="outlined">{bet.stake}</Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body2" mb={1}>
                        Gain
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor:
                            bet.coinsGain > 0
                              ? '#76ff03'
                              : bet.coinsGain <= 0
                              ? '#FF3D30'
                              : '#959595',
                          color:
                            bet.coinsGain > 0
                              ? '#76ff03'
                              : bet.coinsGain <= 0
                              ? '#FF3D30'
                              : '#959595',
                          '&:hover': {
                            borderColor:
                              bet.coinsGain > 0
                                ? '#76ff03'
                                : bet.coinsGain <= 0
                                ? '#FF3D30'
                                : '#959595',
                            color:
                              bet.coinsGain > 0
                                ? '#76ff03'
                                : bet.coinsGain <= 0
                                ? '#FF3D30'
                                : '#959595',
                          },
                        }}
                      >
                        {bet.coinsGain.toFixed(2) ?? '-'}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MyBets;
