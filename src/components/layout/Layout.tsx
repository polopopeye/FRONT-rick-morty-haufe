import React from 'react';
import { Container, InnerContainer } from '../commons';
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
        <InnerContainer>{children}</InnerContainer>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
