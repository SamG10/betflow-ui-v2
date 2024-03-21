import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

const MiddleTopDashboard: React.FC = () => {
  const theme = useTheme();
  const [sport, setSport] = useState<string>('');
  const [league, setLeague] = useState<string>('');

  const handleChangeSport = (event: SelectChangeEvent) => {
    setSport(event.target.value as string);
  };

  const handleChangeLeague = (event: SelectChangeEvent) => {
    setLeague(event.target.value as string);
  };

  return (
    <>
      <Stack direction="column" height="auto">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          width="100%"
        >
          <Stack direction="row" spacing={2} width="40%">
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Sport</InputLabel>
              <Select
                labelId="sport"
                id="sport"
                value={sport}
                label="Sport"
                onChange={handleChangeSport}
                sx={{
                  '& .MuiInputBase-input': {
                    backgroundColor: '#00A0F7',
                    border: 'none',
                    borderRadius: '50px',
                  },
                }}
              >
                <MenuItem value={10}>Soccer</MenuItem>
                <MenuItem value={20}>Other sport coming soon</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">League</InputLabel>
              <Select
                labelId="league"
                id="league"
                value={league}
                label="League"
                onChange={handleChangeLeague}
                sx={{
                  '& .MuiInputBase-input': {
                    backgroundColor: '#00A0F7',
                    border: 'none',
                    borderRadius: '50px',
                  },
                }}
              >
                <MenuItem value={10}>Ligue 1</MenuItem>
                <MenuItem value={20}>Euro</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack>
            <Typography>{new Date().toDateString()}</Typography>
          </Stack>
        </Stack>

        <Stack
          style={{
            height: '280px',
            backgroundColor: theme.palette.background.paper,
            width: '100%',
            borderRadius: '20px',
          }}
        ></Stack>
      </Stack>
    </>
  );
};

export default MiddleTopDashboard;
