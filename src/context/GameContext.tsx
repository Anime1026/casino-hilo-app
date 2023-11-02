import { createContext } from "react";

interface IMyContext {
  funds: number;
  setFunds?: (funds: number) => void;
  userId: number;
  setUserId?: (funds: number) => void;
}

export const MyContext = createContext<IMyContext>({
  funds: 0,
  userId: 0,
});

interface IPercentMulti {
  disableBet: Boolean;
  isBetted: Boolean;
  selectedId: number;
  socket: any;
  continueFlag: Boolean;
  setIsBetted?: (isBetted: Boolean) => void;
  setDisableBet?: (disableBet: Boolean) => void;
  setSelectedId?: (selectedId: number) => void;
  setSocket?: (socket: any) => void;
  setContinueFlag?: (continueFlag: Boolean) => void;
}
const value = {
  continueFlag: false,
  disableBet: false,
  isBetted: false,
  selectedId: 14,
  socket: "",
};

export const PercentMulti = createContext<IPercentMulti>(value);
