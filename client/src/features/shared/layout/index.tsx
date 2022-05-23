import type { FunctionComponent, ReactNode } from 'react';
import NavBar from './nav-bar';
import MainContainer from './main-container';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <MainContainer>{children}</MainContainer>
    </>
  );
};

export default Layout;
