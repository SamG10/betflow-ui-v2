import React from 'react';
import MiddleTopDashboard from '../components/MiddleTopDashboard';
import MiddleBottomDashboard from '../components/MiddleBottomDashboard';
import RightPanel from '../components/RightPanel';
import { Grid } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ maxHeight: 'calc(100vh - 20px)', overflowY: 'auto' }}
      >
        <Grid item xs={12} md={9}>
          <MiddleTopDashboard />
          <MiddleBottomDashboard />
        </Grid>
        <Grid item xs={12} md={3}>
          <RightPanel />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
