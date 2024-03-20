import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useBetsStore } from '../stores/betStore';
import { Bet } from '../interfaces/bet.interface';

const RightPanel: React.FC = () => {
  const theme = useTheme();

  const { bets, deleteBetFromBets } = useBetsStore();
  console.log('bets in rightPanel', bets);

  const computeTeamToDisplay = (bet: Bet) => {
    switch (bet?.team) {
      case 'HOME_TEAM':
        return bet.homeTeam;
      case 'AWAY_TEAM':
        return bet.awayTeam;
      case 'DRAW':
        return 'Draw';
    }
  };

  return (
    <>
      <Stack width="15vw" spacing={2}>
        <Stack>
          <img
            src="src\assets\promosvg.svg"
            alt="promo-img"
            style={{ width: '15vw' }}
          />
        </Stack>
        <Stack
          style={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '20px',
          }}
          padding="10px"
          spacing={1}
          height="50vh"
          justifyContent="space-between"
        >
          {bets?.map((bet) => (
            <Stack
              border={2}
              borderRadius="8px"
              borderColor={theme.palette.primary.main}
              padding="8px"
            >
              <Stack direction="column">
                <Stack direction="row" spacing={2}>
                  <Typography variant="caption">
                    {bet.homeTeam} - {bet.awayTeam}
                  </Typography>
                  <CloseIcon onClick={() => deleteBetFromBets(bet)} />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h6">
                    {computeTeamToDisplay(bet)}
                  </Typography>
                  <Button variant="contained">{bet.odds}</Button>
                </Stack>
                <TextField variant="outlined" type="number" />
              </Stack>
            </Stack>
          ))}
          <Button
            variant="contained"
            onClick={() => {
              console.log('save');
            }}
          >
            Save Bets
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default RightPanel;
