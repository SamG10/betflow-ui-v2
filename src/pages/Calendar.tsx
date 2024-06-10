import React, { useEffect, useState } from 'react';
import { fetchLigue1Standing } from '../services/standing.service';
import {
  Box,
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

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
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

const Calendar: React.FC = () => {
  const [standing, setStanding] = useState<Standing[]>([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
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
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <TableContainer component={Paper}>
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
              {!isSmallScreen && (
                <TableCell align="center" sx={{ padding: '2px' }}>
                  FORM
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {standing[0]?.table?.map((t: StandingTable) => (
              <TableRow key={t.position}>
                <TableCell
                  align="center"
                  sx={{ padding: '4px', borderBottom: 'none' }}
                >
                  <Typography fontWeight="bold">{t.position}</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: '4px', borderBottom: 'none' }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <img src={t.team.crest} alt="team logo" width="25px" />
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
                <TableCell
                  align="center"
                  sx={{ padding: '4px', borderBottom: 'none' }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {t.points}
                  </Typography>
                </TableCell>
                {!isSmallScreen && (
                  <TableCell
                    align="center"
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
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Calendar;
