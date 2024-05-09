import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';
import { getRanking } from '../services/users.service';

const MiddleTopDashboard: React.FC = () => {
  const theme = useTheme();
  const [sport, setSport] = useState<string>('');
  const [league, setLeague] = useState<string>('');
  const [rankingUsers, setRankingUsers] = useState([]);

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
  }, []);

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
          ></Stack>
          <Stack
            bgcolor={theme.palette.background.paper}
            height="270px"
            width="calc((100% / 3) - 30px)"
            borderRadius="20px"
            padding="10px"
          ></Stack>
          <Stack
            bgcolor={theme.palette.background.paper}
            height="270px"
            width="calc((100% / 3) - 30px)"
            borderRadius="20px"
            display="flex"
            padding="10px"
          >
            <Stack>
              <Typography variant="h5" marginBottom={2}>
                Ranking
              </Typography>
              {rankingUsers.map((users, index) => {
                const indexColor = Object.values([1, 2, 3]).includes(index + 1)
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
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default MiddleTopDashboard;
