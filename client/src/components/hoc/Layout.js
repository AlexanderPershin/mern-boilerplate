import React from 'react';

// Layout elements
import Header from '../layout/Header';
import Content from '../layout/Content';
import Footer from '../layout/Footer';
// Show alerts
import Alert from '../parts/Alert';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Alert />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
