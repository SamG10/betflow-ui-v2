import {
  Button,
  Hidden,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useBetsStore } from '../stores/betStore';
import { Bet } from '../interfaces/bet.interface';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../styles/RightPanel.module.css';
import { useState } from 'react';
import { fetchSaveBets } from '../services/bets.service';

const RightPanel: React.FC = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLgScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const { bets, deleteBetFromBets, deleteAllBets } = useBetsStore();

  const [stakes, setStakes] = useState<{ [key: string]: number }>({});

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStakeChange = (betId: number, value: number) => {
    setStakes((prevStakes) => {
      return {
        ...prevStakes,
        [betId]: value,
      };
    });
  };

  const handleBetsToSave = async () => {
    const betsToSave = bets.map((bet) => {
      const newBet = {
        ...bet,
        stake: stakes[bet.eventId],
      };

      return newBet;
    });

    try {
      await fetchSaveBets(betsToSave);
      deleteAllBets();
    } catch (error: unknown) {
      setOpen(true);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  const computeTeamToDisplay = (bet: Bet) => {
    switch (bet?.team) {
      case 'HOME_TEAM':
        return bet.homeTeamName;
      case 'AWAY_TEAM':
        return bet.awayTeamName;
      case 'DRAW':
        return 'Draw';
    }
  };

  return (
    <>
      <Stack
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Hidden lgDown>
          <Stack
            bgcolor={theme.palette.background.paper}
            className={styles.gradient_promo}
            borderRadius="20px"
            display="flex"
            justifyContent="space-between"
            padding="20px"
            marginBottom={1.5}
            height="150px"
          >
            {!isMdScreen && (
              <img src="src\assets\fire.svg" alt="fire" width="45px" />
            )}
            <Typography variant="h6">
              Double your winnings today only!
            </Typography>
            <Typography variant="caption">
              Pick your bet, double your rewards with Betflow, available for
              one-time use!
            </Typography>
          </Stack>
        </Hidden>

        <Stack
          flexDirection="column"
          padding={1}
          spacing={1}
          justifyContent="space-between"
          bgcolor={theme.palette.background.paper}
          borderRadius="20px"
          height={isLgScreen ? 'calc(100vh - 45px)' : 'calc(100vh - 250px)'}
        >
          <Typography variant="h6">{bets.length} bets selected</Typography>
          <Stack
            className={styles.displayBets}
            overflow={'scroll'}
            height={isLgScreen ? 'calc(100vh - 45px)' : 'calc(100vh - 40px)'}
          >
            {bets?.map((bet) => (
              <Stack
                key={bet.eventId}
                flexDirection="column"
                spacing={1}
                padding="5px"
                border="1px solid rgba(255,255,255, 15%)"
                borderRadius="8px"
                marginBottom={1}
              >
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography variant="caption">
                    {bet.homeTeamName} - {bet.awayTeamName}
                  </Typography>
                  <CloseIcon onClick={() => deleteBetFromBets(bet)} />
                </Stack>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography variant="h6">
                    {computeTeamToDisplay(bet)}
                  </Typography>
                  <Button variant="outlined">{bet.odd}</Button>
                </Stack>
                <Stack>
                  <TextField
                    variant="outlined"
                    placeholder="stake"
                    type="number"
                    size="small"
                    onChange={(e) =>
                      handleStakeChange(
                        bet.eventId,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Stack bgcolor="#1C1C24" zIndex={1000}>
            <Button variant="contained" onClick={() => handleBetsToSave()}>
              Save bets
            </Button>
          </Stack>
          <Snackbar
            sx={{ backgroundColor: 'orange', color: 'orange' }}
            open={open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message={error}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default RightPanel;
