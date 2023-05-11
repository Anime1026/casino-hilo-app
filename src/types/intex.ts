export interface CategoriesType {
  id: number;
  title: string;
  reward: number;
}

export interface ColorCategoriesType {
  id: number;
  title: string;
  bgColor: string;
  borderColor: string;
  text: string;
  reward: number;
}

export interface OptionCategoriesType {
  id: number;
  title: string;
  text: string;
  reward: number;
}

export interface HiLoCategoriesType {
  id: number;
  title: string;
  text: string;
  reward: number;
}

export interface KeyboardNumbersType {
  id: number;
  title: string;
  amount: number;
}

export interface HistoryCardsType {
  id: number;
  title: string;
  flag: number;
}

export interface HiLoCalcType {
  prevId: number;
  hPercent: number;
  lPercent: number;
  hMulti: number;
  lMulti: number
}

export interface IContent {
  setHiMulti: React.Dispatch<React.SetStateAction<number>>;
  setLoMulti: React.Dispatch<React.SetStateAction<number>>;
  setHiPercent: React.Dispatch<React.SetStateAction<number>>;
  setLoPercent: React.Dispatch<React.SetStateAction<number>>;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  betAmount: number;
}


export interface GameHistoryType {
  id: number;
  title: string;
  flag: number;
}

export interface CurrentGameType {
  userId: number;
  betId: number;
  betAmount: number;
  isWin: number;
}

export interface BetHistoryType {
  betId: number;
  betAmount: number;
  isWin: number;
}
