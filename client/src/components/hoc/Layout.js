import React from 'react';

// Layout elements
import Header from '../layout/Header';
import Content from '../layout/Content';
import Footer from '../layout/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
