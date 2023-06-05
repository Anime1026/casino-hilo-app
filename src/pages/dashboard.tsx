import { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";

import { Grid, Stack } from "@mui/material";

import Content from "../components/Content";
import { BetHistoryType } from "../types/intex";
import { MyContext, PercentMulti } from "../context/GameContext";
import ControlPanel from "../components/ControlPanel";
import BetHistory from "../components/History";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

let flag = false;

const Dashboard = () => {
  const [hPercent, setHiPercent] = useState<number>(64);
  const [lPercent, setLoPercent] = useState<number>(24);
  const [hMulti, setHiMulti] = useState<number>(1.5);
  const [lMulti, setLoMulti] = useState<number>(4);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [betHistory, setBetHistory] = useState<BetHistoryType[]>([]);
  const { setSocket, socket } = useContext(PercentMulti);
  const { userId } = useContext(MyContext);

  let socketConnection: Socket;
  const load = async () => {
    socketConnection = io(process.env.REACT_APP_SERVER_URL as string);
    setSocket!(socketConnection);
  };

  const SaveSocketId = async (userId: number, socketId: String) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/game/save-socketId`, {
        userId,
        socketId,
      })
      .then((result) => {
        console.log(result, "result");
      })
      .catch((error) => {
        console.log(error, "error---------");
      });
  };

  useEffect(() => {
    if (!socketConnection) {
      if (userId !== 0 && socket) {
        SaveSocketId(userId, socket.id);
      }
    }
  }, [userId, socket]);

  useEffect(() => {
    if (!sessionStorage.getItem("hilo-uuid")) {
      sessionStorage.setItem("hilo-uuid", uuidv4());
    }
    load();
  }, []);

  return (
    <Stack className="dashboard">
      <Grid
        container
        spacing={3}
        sx={{ flexDirection: { md: "row-reverse", xs: "row", pb: "1em" } }}
      >
        <Grid md={8} sm={12} xs={12} item>
          <Content
            setLoMulti={setLoMulti}
            setHiPercent={setHiPercent}
            setHiMulti={setHiMulti}
            setLoPercent={setLoPercent}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            setBetHistory={setBetHistory}
          />
        </Grid>
        <Grid md={4} sm={12} xs={12} item className="desktop">
          <ControlPanel
            hPercent={hPercent}
            lPercent={lPercent}
            hMulti={hMulti}
            lMulti={lMulti}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
          />
        </Grid>
        <Grid md={12} item>
          <BetHistory betHistory={betHistory} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Dashboard;
