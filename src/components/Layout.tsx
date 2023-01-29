import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

export const Layout: FC<{ children: React.ReactNode; isCart: boolean }> = ({
  children,
  isCart,
}) => {
  return (
    <>
      <Header isCart={isCart}></Header>
      {children}
      <Footer isCart={isCart}></Footer>
    </>
  );
};
