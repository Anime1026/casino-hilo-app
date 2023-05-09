import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { MyContext, PercentMulti } from "../context/GameContext"

const Layout = ({ children }: { children: React.ReactNode }) => {

  const [socket, setSocket] = useState<any>("")
  const [funds, setFunds] = useState<number>(500000)
  const [selectedId, setSelectedId] = useState<number>(18)
  const [isBetted, setIsBetted] = useState<Boolean>(false)
  const [disableBet, setDisableBet] = useState<Boolean>(false)

  return (
    <Stack className="app">
      <MyContext.Provider value={{ funds, setFunds }}>
        <PercentMulti.Provider value={{ isBetted, setIsBetted, disableBet, setDisableBet, selectedId, setSelectedId, socket, setSocket }}>
          <Header />
          <Container className="m-container">
            {children}
          </Container>
          <Footer />
        </PercentMulti.Provider>
      </MyContext.Provider>
    </Stack>
  );
};

export default Layout;
