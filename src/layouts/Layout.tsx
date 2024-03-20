import React, { ReactNode } from 'react';
import LeftNavigationBar from '../components/LeftNavigationBar';
import RightPanel from '../components/RightPanel';
import styles from '../styles/Layout.module.css';
import MiddleTopDashboard from '../components/MiddleTopDashboard';
import MiddleBottomDashboard from '../components/MiddleBottomDashboard';
import styled from 'styled-components';
import { Stack } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
  `;

  return (
    <>
      <LayoutContainer>
        <LeftNavigationBar />
        <div className={styles.dashboard_container}>
          <Stack sx={{ marginBottom: '10px' }}>
            <MiddleTopDashboard />
          </Stack>
          <MiddleBottomDashboard />
        </div>
        <div className={styles.rightPanel}>
          <RightPanel />
        </div>
        {children}
      </LayoutContainer>
    </>
  );
};

export default Layout;
