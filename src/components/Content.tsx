/* eslint-disable */
import { useContext, useRef, useState, useEffect, useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import anime from "animejs";
import {
  BetHistoryType,
  CurrentGameType,
  GameHistoryType,
  HistoryCardsType,
} from "../types/intex";
import { HiLoCalc } from "../config";
import BackCard from "../assets/img/-1.png";
import { toast } from "react-toastify";
import axios from "axios";
import { MyContext, PercentMulti } from "../context/GameContext";
let effectFlag = false;
let prevNumber = 4;
let betFlag: Boolean = false;
let bet_Amount = 100;
let selected_Id = 18;
let hMulti = 1.5;
let lMulti = 4;
let user_Id = 0;
let betHistory: BetHistoryType[] = [];

const Content = ({
  setLoPercent,
  setHiPercent,
  setLoMulti,
  setHiMulti,
  betAmount,
  setBetAmount,
  setBetHistory,
}: any) => {
  const {
    setIsBetted,
    isBetted,
    setDisableBet,
    selectedId,
    socket,
    setSelectedId,
  } = useContext(PercentMulti);

  const { userId } = useContext(MyContext);

  const CardRef = useRef(null);
  const [HistoryCard, setHistoryCard] = useState<HistoryCardsType[] | any>([]);
  const [curCard, setCurCard] = useState<number>(-1);
  const [timeCount, setTimeCount] = useState<number>();
  const [stopCard, setStopCard] = useState<Boolean>(false);
  const EqualImg = "https://nar-fg.cchhllpp.net/prd/images/hilo/svg/equal.svg";
  const HiImg = "https://nar-fg.cchhllpp.net/prd/images/hilo/svg/hi.svg";
  const LoImg = "https://nar-fg.cchhllpp.net/prd/images/hilo/svg/lo.svg";

  const FlipCard = useCallback(async (rndNumber: number) => {
    // Create animation timeline
    const timeline = anime.timeline({
      autoplay: true,
    });

    timeline.add({
      targets: CardRef.current,
      rotateY: { value: "+=180" },
      easing: "easeInOutSine",
      duration: 1000,
    });

    timeline.add({
      targets: CardRef.current,
      rotateY: 0,
      easing: "easeInOutSine",
      duration: 1000,
    });

    timeline.play();

    prevNumber = rndNumber > 12 ? rndNumber - 12 : rndNumber;

    let foundItem = HiLoCalc.find((item) => {
      return item.prevId === prevNumber;
    });
    if (foundItem) {
      hMulti = foundItem.hMulti;
      lMulti = foundItem.lMulti;
      setHiPercent!(foundItem.hPercent);
      setLoPercent!(foundItem.lPercent);
      setHiMulti!(foundItem.hMulti);
      setLoMulti!(foundItem.lMulti);
    }
    setTimeout(() => {
      setCurCard(rndNumber);
      setDisableBet!(false);
      setSelectedId!(100);
      selected_Id = 100;
    }, 500);
  }, []);

  useEffect(() => {
    if (isBetted) {
      betFlag = isBetted;
      bet_Amount = Number(betAmount);
      selected_Id = selectedId;
      user_Id = userId;
    }
  }, [isBetted, selectedId]);

  const betGame = async () => {
    let gameResult = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/game/bet-game`,
      {
        bet_Amount,
        selected_Id,
        betFlag,
        hMulti,
        lMulti,
        uuid: sessionStorage.getItem("hilo-uuid"),
        userId: user_Id,
      }
    );

    let arr = {
      betId: selected_Id,
      betAmount: bet_Amount,
      isWin: gameResult.data.Bet_Amount,
    };

    betHistory.unshift(arr);

    setBetHistory(betHistory);

    if (gameResult.data.Bet_Amount === 0) {
      betFlag = false;
      setIsBetted!(false);
      bet_Amount = 0;
      setBetAmount(0);
      toast.error("Try Again");
    } else {
      setBetAmount(Number(gameResult.data.Bet_Amount.toFixed()));
    }
  };

  useEffect(() => {
    if (effectFlag && socket) {
      socket.on(
        "real-time",
        (data: {
          time: number;
          gameHistory: GameHistoryType[];
          currentGame: CurrentGameType[];
        }) => {
          setHistoryCard(data.gameHistory);
          if (data.time === 1) {
            setDisableBet!(true);
          }
          if (data.time === 0) {
            if (betFlag && selected_Id !== 100) {
              betGame();
            }
            setStopCard(true);
            FlipCard(data.gameHistory[0].id as number);
          } else {
            setCurCard(
              data?.gameHistory?.[0]?.id >= 0 ? data?.gameHistory?.[0]?.id : -1
            );
            setStopCard(false);
            setTimeCount(data.time);
          }
        }
      );
    } else {
      effectFlag = true;
    }
  }, [effectFlag]);

  return (
    <Stack className="content">
      <Stack className="card-history">
        {HistoryCard?.map((item: HistoryCardsType, key: number) => {
          if (item.id === 0) {
            return (
              <Stack key={key} className="card-small">
                <img
                  src="https://nar-fg.cchhllpp.net/prd/images/hilo/svg/joker.svg"
                  alt="img"
                  className="joker-card"
                />
                <img
                  src={
                    item.flag === 0 ? EqualImg : item.flag === 2 ? HiImg : LoImg
                  }
                  alt="img"
                />
              </Stack>
            );
          } else {
            return (
              <Stack key={key} className="card-small">
                <Typography sx={{ color: item.id > 12 ? "red" : "black" }}>
                  {item.title}
                </Typography>
                <img
                  src={
                    item.flag === 0 ? EqualImg : item.flag === 2 ? HiImg : LoImg
                  }
                  alt="img"
                />
              </Stack>
            );
          }
        })}
      </Stack>
      <Stack className="card-main">
        <Box className="card-animation-scene" ref={CardRef}>
          <Box className="card-front">
            <img
              src={`/Card/${curCard}.png`}
              alt="card"
              className="playing-card"
            />
            <span
              className="loader"
              style={{ display: stopCard ? "none" : "block" }}
            ></span>
            <span
              className="time-count"
              style={{ display: stopCard ? "none" : "block" }}
            >
              {timeCount}
            </span>
          </Box>
          <Box className="card-back">
            <img src={BackCard} alt="card" className="playing-card" />
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Content;
