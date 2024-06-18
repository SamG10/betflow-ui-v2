import {
  Avatar,
  Box,
  Hidden,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getRanking } from '../services/users.service';
import { fetchLigue1Standing } from '../services/standing.service';
import style from '../styles/MiddleTopDashboard.module.css';

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
  tla: string;
}

export interface StandingTable {
  position: number;
  team: Team;
  points: number;
  form: string;
}

export interface Standing {
  stage: string;
  type: string;
  group: string | null;
  table: StandingTable[];
}

export interface RankingUser {
  firstname: string;
  coins: number;
}

const MiddleTopDashboard: React.FC = () => {
  const theme = useTheme();
  const [rankingUsers, setRankingUsers] = useState<RankingUser[]>([]);
  const [standing, setStanding] = useState<Standing[]>([]);

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

    const getLigue1Standing = async () => {
      try {
        const standing = await fetchLigue1Standing();
        setStanding(standing[0].standings);
      } catch (error) {
        console.log(error);
      }
    };
    getLigue1Standing();
  }, []);

  const formColorBackground = (form: string) => {
    switch (form) {
      case 'W':
        return 'green';
      case 'D':
        return 'orange';
      case 'L':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <>
      <Stack direction="column">
        <Stack
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Hidden lgDown>
            <Stack
              bgcolor={theme.palette.background.paper}
              height="270px"
              width="calc((100% / 3) - 30px)"
              borderRadius="20px"
              padding="10px"
            >
              <TableContainer component={Paper} className={style.hideScrollBar}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ padding: '2px' }}>
                        #
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '2px' }}>
                        Team
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '2px' }}>
                        PTS
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '2px' }}>
                        FORM
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {standing[0]?.table?.map((t: StandingTable) => {
                      return (
                        <TableRow key={t.position}>
                          <TableCell
                            align="center"
                            sx={{ padding: '4px', borderBottom: 'none' }}
                          >
                            <Typography fontWeight="bold">
                              {t.position}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ padding: '4px', borderBottom: 'none' }}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <img
                                src={t.team.crest}
                                alt="team logo"
                                width="25px"
                              />
                              <Stack
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                <Typography>{t.team.tla}</Typography>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ padding: '4px', borderBottom: 'none' }}
                          >
                            <Typography variant="body1" fontWeight="bold">
                              {t.points}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '4px',
                              borderBottom: 'none',
                            }}
                          >
                            <Stack direction="row" spacing={0.5}>
                              {t.form.split(',').map((f, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: formColorBackground(f),
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  <Typography variant="body2">{f}</Typography>
                                </Box>
                              ))}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Hidden>

          {/* Hidden on screens smaller than medium (md) */}
          <Hidden lgDown>
            <Stack
              bgcolor={theme.palette.background.paper}
              height="270px"
              width="calc((100% / 3) - 30px)"
              borderRadius="20px"
              padding="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption" fontWeight="light">
                Live Events availble soon
              </Typography>
            </Stack>
          </Hidden>

          {/* Hidden on screens smaller than medium (md) */}
          <Hidden lgDown>
            <Stack
              className={style.gradientRankingUsers}
              height="270px"
              width="calc((100% / 3) - 30px)"
              borderRadius="20px"
              display="flex"
              direction="column"
              justifyContent="center"
              padding="10px"
            >
              <Stack className={style.hideScrollBar} overflow="scroll">
                {rankingUsers?.length > 0 ? (
                  rankingUsers.map((users, index) => {
                    const indexColor = Object.values([0, 1, 2]).includes(index)
                      ? '#00A0F7'
                      : '#77777';
                    return (
                      <Stack
                        direction="row"
                        spacing={2}
                        display="flex"
                        alignItems="center"
                        key={index}
                        padding={1}
                        margin={0.5}
                        borderRadius={2}
                      >
                        <Stack>
                          <Typography
                            variant="h6"
                            width="25px"
                            fontWeight="bold"
                            color={indexColor}
                          >
                            {index + 1}
                          </Typography>
                        </Stack>
                        <Avatar sx={{ width: 50, height: 50 }} />
                        <Typography
                          variant="body1"
                          color="white"
                          fontWeight="bold"
                        >
                          {users.coins.toFixed(2)}
                        </Typography>
                        <Typography variant="h6">{users.firstname}</Typography>
                      </Stack>
                    );
                  })
                ) : (
                  <Typography variant="body1">Ranking</Typography>
                )}
              </Stack>
            </Stack>
          </Hidden>
        </Stack>
      </Stack>
    </>
  );
};

export default MiddleTopDashboard;
