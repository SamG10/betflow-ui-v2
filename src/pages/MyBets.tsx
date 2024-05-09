import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../services/users.service';
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

const MyBets: React.FC = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <Typography variant="h5">My Bets</Typography>
      <Stack>
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            borderRadius: '20px',
          }}
        >
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                  EventDate
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
                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                  Win / Loss
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                  Stake
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                  CoinsGain
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userInfo?.bets?.map((bet) => (
                <TableRow key={bet._id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: 'none' }}
                  >
                    {bet.eventDate.split('T')[0]}
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
                      {bet.homeTeamName}
                    </Typography>
                    <img
                      src={bet.homeTeamLogo}
                      alt="home_team_logo"
                      width="50px"
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    <Button
                      variant={
                        bet?.odd === bet.homeTeamOdd ? 'contained' : 'outlined'
                      }
                    >
                      {bet.homeTeamOdd}
                    </Button>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    <Button
                      variant={
                        bet?.odd === bet.drawTeamOdd ? 'contained' : 'outlined'
                      }
                    >
                      {bet.drawTeamOdd}
                    </Button>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    <Button
                      variant={
                        bet?.odd === bet.awayTeamOdd ? 'contained' : 'outlined'
                      }
                    >
                      {bet.awayTeamOdd}
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
                      {bet.awayTeamName}
                    </Typography>
                    <img
                      src={bet.awayTeamLogo}
                      alt="home_team_logo"
                      width="50px"
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    <Typography variant="body">{bet.status}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    <Typography variant="body">
                      {bet?.betResult ?? 'None result for this moment'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    <Typography variant="body">{bet?.stake}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    <Typography variant="body">
                      {bet?.payed ? bet?.coinsGain : 'Bet in progress'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default MyBets;
