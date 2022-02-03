import React from "react";

import Container from "@/common/components/Container";

import Footer from "./Footer";
import NavBar from "./NavBar";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default DefaultLayout;
