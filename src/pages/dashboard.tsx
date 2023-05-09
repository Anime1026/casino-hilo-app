import { useState, useEffect, useContext } from "react"
import io from "socket.io-client";

import { Grid, Stack } from "@mui/material";

import Content from "../components/Content";
import { GameHistoryType } from "../types/intex";
import { PercentMulti } from "../context/GameContext";
import ControlPanel from "../components/ControlPanel";

let flag = false;

const Dashboard = () => {

  const [hPercent, setHiPercent] = useState<number>(64);
  const [lPercent, setLoPercent] = useState<number>(24);
  const [hMulti, setHiMulti] = useState<number>(1.5);
  const [lMulti, setLoMulti] = useState<number>(4);
  const [betAmount, setBetAmount] = useState<number>(100);
  const { socket, setSocket } = useContext(PercentMulti);

  const load = async () => {
    let socketConnection: any = io(process.env.REACT_APP_SERVER_URL as string);
    setSocket!(socketConnection)
  };

  useEffect(() => {
    if (flag) {
      load()
    } else {
      flag = true;
    }
  }, [flag])

  return (
    <Stack className="dashboard">
      <Grid container spacing={3} sx={{ flexDirection: { md: "row-reverse", xs: "row", pb: '1em' } }}>
        <Grid md={8} sm={12} xs={12} item>
          <Content
            setLoMulti={setLoMulti}
            setHiPercent={setHiPercent}
            setHiMulti={setHiMulti}
            setLoPercent={setLoPercent}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
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
      </Grid>
    </Stack >
  );
};

export default Dashboard;
