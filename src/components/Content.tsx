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
import { dir } from "console";

let effectFlag = false;
let prevNumber = 4;
let betFlag: Boolean = false;
let bet_Amount = 100;
let selected_Id = 50;
let hMulti = 1.5;
let lMulti = 4;
let user_Id = 0;
let betHistory: BetHistoryType[] = [];
let c_flag: Boolean = false;

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
    continueFlag,
    setContinueFlag,
  } = useContext(PercentMulti);

  const { userId } = useContext(MyContext);

  const CardRef = useRef(null);
  const [HistoryCard, setHistoryCard] = useState<HistoryCardsType[] | any>([]);
  const [curCard, setCurCard] = useState<number>(0);
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
      setSelectedId!(50);
      // setSelectedId!(50);
    }, 500);
  }, []);

  useEffect(() => {
    if (isBetted) {
      betFlag = isBetted;
      bet_Amount = Number(betAmount);
      user_Id = userId;
    }
  }, [isBetted, selectedId]);

  const betGame = async () => {
    console.log("selectedId:", selectedId);
    let gameResult = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/game/bet-game`,
      {
        bet_Amount,
        selectedId,
        betFlag,
        hMulti,
        lMulti,
        uuid: sessionStorage.getItem("hilo-uuid"),
        userId: user_Id,
        continueFlag: c_flag,
      }
    );

    let arr = {
      betId: selectedId === 100 ? 18 : selectedId,
      betAmount: bet_Amount,
      isWin: gameResult.data.Bet_Amount,
    };

    betHistory.unshift(arr);

    setBetHistory(betHistory);

    if (gameResult.data.Bet_Amount === 0) {
      c_flag = false;
      setContinueFlag!(false);
      betFlag = false;
      setIsBetted!(false);
      bet_Amount = 0;
      setBetAmount(0);
      toast.error("Try Again");
    } else {
      c_flag = true;
      setContinueFlag!(true);
      bet_Amount = Number(Number(gameResult.data.Bet_Amount).toFixed());
      setBetAmount(Number(Number(gameResult.data.Bet_Amount).toFixed()));
    }
  };


  useEffect(() => {
    console.log(' betFlag');
    console.log(betFlag);
    if (betFlag && selectedId !== 50) {
      betGame();
    }
  }, [selectedId, betFlag])

  useEffect(() => {
    if (socket) {
      socket.on(
        "real-time",
        (data: {
          time: number;
          gameHistory: GameHistoryType[];
          currentGame: CurrentGameType[];
        }) => {
          setTimeout(() => {
            console.log("showing card within 2.5s");
            setHistoryCard(data.gameHistory);
          }, 2500)
          if (data.time === 1) {
            // setDisableBet!(true);
          }
          // if (data.time === 0) {
          // setStopCard(true);
          FlipCard(data.gameHistory[0].id as number);
          // } else {
          setCurCard(
            data?.gameHistory?.[0]?.id >= 0 ? data?.gameHistory?.[0]?.id : -1
          );
          // setStopCard(false);
          setTimeCount(data.time);
          // }
        }
      );
    }
  }, [socket]);

  useEffect(() => {
    console.log(continueFlag, "continueFlag");
    c_flag = continueFlag;
  }, [continueFlag]);

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
            {/* <span
              className="loader"
              style={{ display: stopCard ? "none" : "block" }}
            ></span>
            <span
              className="time-count"
              style={{ display: stopCard ? "none" : "block" }}
            >
              {timeCount}
            </span> */}
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
