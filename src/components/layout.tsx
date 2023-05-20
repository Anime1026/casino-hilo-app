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

  let token = location.pathname.split("=")[1];
  console.log(token, "token");
  // let token =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhY2IxOTBjNDBhY2Y0ZGEzYjM3YTEwNDJmY2EzMWQxMyIsInN1YiI6IntcImFwcFR5cGVcIjpcIjIzNFwiLFwiY2hhbm5lbElkXCI6XCJoNVwiLFwiY3JlYXRlVGltZVwiOjE2ODQzMjQzMjgwMDAsXCJpbnZpdGVDb2RlXCI6XCJBUlFET1dcIixcImlzVGVzdFwiOjAsXCJsYXN0TG9naW5UaW1lXCI6MTY4NDUwMDc3NjA0MCxcIm1lbWJlckxldmVsXCI6MSxcInBhY2thZ2VJZFwiOjQsXCJwYXNzd29yZFwiOlwiYTQxNjcxZDliOTg1NDkwNTExYzdlNDMwNzZlZTIzOWZsb3R0ZXJ5LTIwMjJcIixcInJlZ2lzdGVySXBcIjpcIjIxOC4xOTAuMjQ1LjQ0XCIsXCJyZWdpc3RlclNvdXJjZVwiOlwiaDVcIixcInJlZ2lzdGVyVmVyc2lvbkNvZGVcIjoyMzQsXCJzdGF0dXNcIjowLFwidXBkYXRlVGltZVwiOjE2ODQ1MDA3NzYwNDAsXCJ1c2VySWRcIjoxNjc3MTMsXCJ1c2VyTmFtZVwiOlwiMTExMTFcIixcInVzZXJQaG9uZVwiOlwiMTIzNDU2Nzg4OFwifSIsImlzcyI6InNnIiwiaWF0IjoxNjg0NTAwNzc2fQ.mzk9PbmIqh_ms2bHq1E6w_aECC-592RRGrFCFW7DIkg";

  const getUserInfo = async () => {
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
