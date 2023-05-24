import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { MyContext, PercentMulti } from "../context/GameContext";
import axios from "axios";
let flag = false;
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>("");
  const [funds, setFunds] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number>(18);
  const [isBetted, setIsBetted] = useState<Boolean>(false);
  const [disableBet, setDisableBet] = useState<Boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [depositFlag, setdepositFlag] = useState<Boolean>(false);
  const [continueFlag, setContinueFlag] = useState<Boolean>(false);
  let token = document.location.href.split("=")[1];
  const getUserInfo = async () => {
    let userInfo: any = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/game/get-userInfo`,
      {
        token,
      }
    );
    if (userInfo.data.balance === 0) {
      setdepositFlag(true);
    }

    setUserId(userInfo.data.userId);
    setFunds(userInfo.data.balance);
  };

  useEffect(() => {
    if (flag) {
      console.log(888877);
      getUserInfo();
    } else {
      flag = true;
    }
  }, []);

  return (
    <Stack className="app">
      <MyContext.Provider value={{ funds, setFunds, userId, setUserId }}>
        <PercentMulti.Provider
          value={{
            isBetted,
            setIsBetted,
            disableBet,
            setDisableBet,
            selectedId,
            setSelectedId,
            socket,
            setSocket,
            continueFlag,
            setContinueFlag,
          }}
        >
          <Header depositFlag={depositFlag} />
          <Container className="m-container">{children}</Container>
          <Footer />
        </PercentMulti.Provider>
      </MyContext.Provider>
    </Stack>
  );
};

export default Layout;
