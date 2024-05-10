import {
  Avatar,
  FormControl,
  InputLabel,
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
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';
import { getRanking } from '../services/users.service';
import { fetchLigue1Standing } from '../services/standing.service';
import style from '../styles/MiddleTopDashboard.module.css';

const MiddleTopDashboard: React.FC = () => {
  const theme = useTheme();
  const [sport, setSport] = useState<string>('');
  const [league, setLeague] = useState<string>('');
  const [rankingUsers, setRankingUsers] = useState([]);
  const [standing, setStanding] = useState([]);

  const handleChangeSport = (event: SelectChangeEvent) => {
    setSport(event.target.value as string);
  };

  const handleChangeLeague = (event: SelectChangeEvent) => {
    setLeague(event.target.value as string);
  };

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
        setStanding(standing);
      } catch (error) {
        console.log(error);
      }
    };
    getLigue1Standing();
  }, []);

  const standings = standing[0]?.standings[0];
  console.log(standings);

  return (
    <>
      <Stack direction="column">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          width="100%"
        >
          <Stack direction="row" spacing={2} width="40%">
            <CustomSelect values={['Soccer', 'Basketball', 'Formula 1']} />
            <CustomSelect values={['Ligue 1', 'Euro']} />
          </Stack>
          <Typography>{new Date().toDateString()}</Typography>
        </Stack>

        <Stack
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack
            bgcolor={theme.palette.background.paper}
            height="270px"
            width="calc((100% / 3) - 30px)"
            borderRadius="20px"
            padding="10px"
          >
            <TableContainer component={Paper} className={style.hideScrollBar}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" padding="none">
                      #
                    </TableCell>
                    <TableCell align="center" padding="none">
                      Team
                    </TableCell>
                    <TableCell align="center" padding="none">
                      PTS
                    </TableCell>
                    <TableCell align="center" padding="none">
                      FORM
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {standings?.table.map((t) => (
                    <TableRow key={t.position}>
                      <TableCell align="center" padding="none">
                        <Typography fontWeight="bold">{t.position}</Typography>
                      </TableCell>
                      <TableCell align="center" padding="none">
                        <Stack direction="row" spacing={1} alignItems="center">
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
                            <Typography>{t.team.shortName}</Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {t.points}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {t.form}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
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
          <Stack
            bgcolor={theme.palette.background.paper}
            height="270px"
            width="calc((100% / 3) - 30px)"
            borderRadius="20px"
            display="flex"
            padding="10px"
          >
            <Stack padding="10px">
              {rankingUsers.length > 0 ? (
                rankingUsers.map((users, index) => {
                  const indexColor = Object.values([1, 2, 3]).includes(
                    index + 1
                  )
                    ? '#F5DD61'
                    : 'white';
                  return (
                    <Stack
                      direction="row"
                      spacing={2}
                      borderBottom="1px solid #FFFFFF"
                      display="flex"
                      alignItems="center"
                      key={index}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {index + 1}
                      </Typography>
                      <Avatar sx={{ width: 24, height: 24 }} />
                      <Typography
                        variant="body1"
                        color={indexColor}
                        fontWeight="bold"
                      >
                        {users.coins}
                      </Typography>
                      <Typography variant="body1">{users.firstname}</Typography>
                    </Stack>
                  );
                })
              ) : (
                <Typography variant="body1">Ranking</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default MiddleTopDashboard;
