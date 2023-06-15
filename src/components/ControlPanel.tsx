/* eslint-disable */
import { useContext, useEffect } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { MyContext, PercentMulti } from "../context/GameContext";
import {
  Categories,
  ColorCategories,
  HiLoCategories,
  KeyboardNumbers,
  OptionCategories,
} from "../config";
import {
  CategoriesType,
  ColorCategoriesType,
  HiLoCategoriesType,
  KeyboardNumbersType,
  OptionCategoriesType,
} from "../types/intex";
import { toast } from "react-toastify";
import axios from "axios";

interface IControlPanel {
  hPercent: number;
  lPercent: number;
  hMulti: number;
  lMulti: number;
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
}

const ControlPanel: React.FC<IControlPanel> = ({
  hPercent,
  lPercent,
  hMulti,
  lMulti,
  betAmount,
  setBetAmount,
}: any) => {
  // @ts-ignore
  const { funds, setFunds, userId } = useContext(MyContext);
  const {
    setIsBetted,
    isBetted,
    disableBet,
    setDisableBet,
    selectedId,
    setSelectedId,
    setContinueFlag,
  } = useContext(PercentMulti);

  const StartBet = async () => {
    if (isBetted) {
      var fund = funds + Number(betAmount);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/game/update-balance`,
        { userId, selectedId }
      );
      setIsBetted!(false);
      setSelectedId!(100);
      setFunds!(fund);
      setBetAmount(0);
      setContinueFlag!(false);
      toast.success(`You Won the ${betAmount}`);
    } else {
      if (selectedId !== undefined && selectedId !== 100) {
        if (betAmount < 50) {
          toast.error("Minimum Bet is 50");
        } else if (betAmount > 500000) {
          toast.error("Maximum Bet is 500000");
        } else if (betAmount > funds) {
          toast.error("Not enough funds, please make a deposit");
        } else {
          var leftFunds = funds - betAmount;
          await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/game/bet-game-ready`,
            { userId, selectedId, betAmount }
          );
          setDisableBet!(true);
          setFunds!(leftFunds);
          setIsBetted!(!isBetted);
          setContinueFlag!(false);
          toast.success("Your Bet is placed");
        }
      } else {
        toast.error("Please select combination");
      }
    }
  };

  return (
    <Stack spacing={2}>
      <Stack
        className="control-box"
        sx={{ pointerEvents: disableBet ? "none" : "all" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box className="divider" />
          <Typography className="control-font">x12</Typography>
          <Box className="divider" style={{ transform: "rotate(180deg)" }} />
        </Stack>

        <Stack pt={1}>
          <Grid container className="m-category">
            {Categories.map((item: CategoriesType, key: number) => {
              return (
                <Grid key={key} item md={12 / 11}>
                  <Stack
                    onClick={() => setSelectedId!(item.id)}
                    className={`count-box ${
                      item.id === selectedId ? "active" : ""
                    }`}
                  >
                    <Typography className="text">{item.title}</Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Stack>

      <Stack
        className="control-box"
        sx={{ pointerEvents: disableBet ? "none" : "all" }}
      >
        <Grid container>
          <Grid md={4} item flex={1}>
            <Stack className="control-tab">
              {ColorCategories.map((item: ColorCategoriesType, key: number) => {
                return (
                  <Stack
                    flex={1}
                    key={key}
                    direction="row"
                    onClick={() => setSelectedId!(item.id)}
                    className={`count-box ${
                      item.id === selectedId ? "active" : ""
                    }`}
                    sx={{
                      background: item.bgColor,
                      borderColor: item.borderColor,
                    }}
                  >
                    <Typography className="color-text">{item.title}</Typography>
                    <Typography
                      className="color-text control-font"
                      sx={{ textAlign: "right" }}
                    >
                      {item.text}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>

          <Grid md={4} item flex={1}>
            <Stack className="control-tab">
              {OptionCategories.map(
                (item: OptionCategoriesType, key: number) => {
                  return (
                    <Stack
                      key={key}
                      direction="row"
                      onClick={() => setSelectedId!(item.id)}
                      className={`count-box ${
                        item.id === selectedId ? "active" : ""
                      }`}
                    >
                      <Typography className="color-text">
                        {item.title}
                      </Typography>
                      <Typography
                        className="color-text control-font"
                        sx={{ textAlign: "right" }}
                      >
                        {item.text}
                      </Typography>
                    </Stack>
                  );
                }
              )}
            </Stack>
          </Grid>

          <Grid md={4} item flex={1}>
            <Stack className="control-tab">
              {HiLoCategories.map((item: HiLoCategoriesType, key: number) => {
                return (
                  <Stack
                    key={key}
                    flex={1}
                    direction="row"
                    onClick={() => setSelectedId!(item.id)}
                    className={`${item.text} count-box hi-lo-tab ${
                      item.id === selectedId ? "active" : ""
                    }`}
                  >
                    <Typography className="color-text">{item.title}</Typography>
                    {item.id === 18 ? (
                      <>
                        <Box className="suc-percent">{hPercent}%</Box>
                        <Box className="reward-x control-font">x{hMulti}</Box>
                      </>
                    ) : (
                      <>
                        <Box className="suc-percent">{lPercent}%</Box>
                        <Box className="reward-x control-font">x{lMulti}</Box>
                      </>
                    )}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Stack
        className="control-box input-box"
        sx={{ pointerEvents: disableBet || isBetted ? "none" : "all" }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" className="inputBetAmount">
            <Typography
              className="btnPlus"
              onClick={() => {
                betAmount >= 50
                  ? setBetAmount(betAmount - 50)
                  : setBetAmount(betAmount);
              }}
            >
              -
            </Typography>
            <TextField
              value={betAmount}
              disabled={disableBet ? true : false}
              className="display-bet-amount"
              onChange={(e) => {
                Number(e.target.value)>=0
                  ? setBetAmount(Number(e.target.value))
                  : setBetAmount(betAmount);
              }}
            ></TextField>
            <Typography
              className="btnPlus"
              onClick={() => {
                betAmount <= 10000
                  ? setBetAmount(betAmount + 50)
                  : setBetAmount(betAmount);
              }}
            >
              +
            </Typography>
          </Stack>
          <Button
            variant="contained"
            className="btn-double"
            onClick={() => setBetAmount(betAmount * 2)}
          >
            X2
          </Button>
        </Stack>
        <Stack pt={1} spacing={1}>
          <Grid container spacing={1} className="m-category">
            {KeyboardNumbers.slice(9, 13).map(
              (item: KeyboardNumbersType, key: number) => {
                return (
                  <Grid item md={3} key={key} xs={3}>
                    <Button
                      variant="contained"
                      onClick={() => setBetAmount(item.amount)}
                      className="btn-default"
                    >
                      {item.title}
                    </Button>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Stack>
        <Stack pt={1} spacing={1}>
          <Button
            variant="contained"
            className="btn-bet"
            sx={{ pointerEvents: disableBet ? "none" : "all" }}
            onClick={StartBet}
          >
            {isBetted ? "Cash Out" : "Bet"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ControlPanel;
