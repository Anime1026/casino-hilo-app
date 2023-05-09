import { createContext } from "react";

interface IMyContext {
    funds: number;
    setFunds?: (funds: number) => void;
}

export const MyContext = createContext<IMyContext>({
    funds: 50000
});

interface IPercentMulti {
    disableBet: Boolean;
    isBetted: Boolean;
    selectedId: number;
    socket: any;
    setIsBetted?: (isBetted: Boolean) => void;
    setDisableBet?: (disableBet: Boolean) => void;
    setSelectedId?: (selectedId: number) => void;
    setSocket?: (socket: any) => void;
}
const value = {
    disableBet: false, isBetted: false, selectedId: 18, socket: ""
}

export const PercentMulti = createContext<IPercentMulti>(value)