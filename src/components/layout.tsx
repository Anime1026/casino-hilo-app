import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { MyContext, PercentMulti } from "../context/GameContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>("");
  const [funds, setFunds] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number>(18);
  const [isBetted, setIsBetted] = useState<Boolean>(false);
  const [disableBet, setDisableBet] = useState<Boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const location = useLocation();
  var flag = false;

  console.log(location.pathname);
  let token = location.pathname.split("=")[1];
  const getUserInfo = async () => {
    console.log("==========================================", token);
    let userInfo: any = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/game/get-userInfo`,
      {
        token,
      }
    );

    setUserId(userInfo.data.userId);
    setFunds(userInfo.data.balance);
  };

  useEffect(() => {
    if (flag) {
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
          }}
        >
          <Header />
          <Container className="m-container">{children}</Container>
          <Footer />
        </PercentMulti.Provider>
      </MyContext.Provider>
    </Stack>
  );
};

export default Layout;
