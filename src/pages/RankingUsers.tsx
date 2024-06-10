import {
  Avatar,
  Paper,
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
import { getRanking } from '../services/users.service';

export interface RankingUser {
  firstname: string;
  coins: number;
}

const RankingUsers: React.FC = () => {
  const [rankingUsers, setRankingUsers] = useState<RankingUser[]>([]);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    const usersRanking = async () => {
      try {
        const ranking = await getRanking();
        setRankingUsers(ranking);
      } catch (error) {
        console.log(error);
      }
    };

    usersRanking();
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: '10px' }}
      >
        <Table stickyHeader>
          <TableHead
            sx={{
              bgcolor: theme.palette.background.paper,
            }}
          >
            <TableRow>
              <TableCell>#</TableCell>
              {isLargeScreen && <TableCell>Avatar</TableCell>}
              <TableCell>Coins</TableCell>
              <TableCell>Firstname</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankingUsers?.length > 0 ? (
              rankingUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: 'none' }}>{index + 1}</TableCell>
                  {isLargeScreen && (
                    <TableCell sx={{ border: 'none' }}>
                      <Avatar sx={{ width: 30, height: 30 }} />
                    </TableCell>
                  )}
                  <TableCell sx={{ border: 'none' }}>{user.coins}</TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {user.firstname}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isLargeScreen ? 6 : 4}>
                  <Typography variant="body1" align="center">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default RankingUsers;
