import React, { ReactNode } from 'react';
import LeftNavigationBar from '../components/LeftNavigationBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <LeftNavigationBar />
      {children}
    </>
  );
};

export default Layout;
