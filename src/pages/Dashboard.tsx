import React from 'react';
import MiddleTopDashboard from '../components/MiddleTopDashboard';
import MiddleBottomDashboard from '../components/MiddleBottomDashboard';
import RightPanel from '../components/RightPanel';
import { Stack } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{ maxHeight: 'calc(100vh - 20px)' }}
      >
        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ width: '80%', height: 'calc(100vh - 40px)' }}
        >
          <MiddleTopDashboard />
          <MiddleBottomDashboard />
        </Stack>
        <RightPanel />
      </Stack>
    </>
  );
};

export default Dashboard;
