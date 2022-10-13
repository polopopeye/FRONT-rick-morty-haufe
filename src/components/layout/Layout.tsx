import React from 'react';
import { Container } from '../commons';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Container>
        <Header />

        {children}

        <Footer />
      </Container>
    </>
  );
};

export default Layout;
