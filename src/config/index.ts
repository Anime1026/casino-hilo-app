import {
  CategoriesType,
  ColorCategoriesType,
  HiLoCategoriesType,
  HistoryCardsType,
  KeyboardNumbersType,
  OptionCategoriesType,
  HiLoCalcType
} from "@/types/intex";

export const Categories: CategoriesType[] = [
  { id: 0, title: "2", reward: 12 },
  { id: 1, title: "3", reward: 12 },
  { id: 2, title: "4", reward: 12 },
  { id: 3, title: "5", reward: 12 },
  { id: 4, title: "6", reward: 12 },
  { id: 5, title: "7", reward: 12 },
  { id: 6, title: "8", reward: 12 },
  { id: 7, title: "9", reward: 12 },
  { id: 8, title: "J", reward: 12 },
  { id: 9, title: "Q", reward: 12 },
  { id: 10, title: "K", reward: 12 },
];

export const ColorCategories: ColorCategoriesType[] = [
  {
    id: 11,
    title: "Red",
    bgColor:
      "linear-gradient(143.5deg,#ad2a00 10.92%,#9b1b00 36.37%,#7b0000 81.42%)!important",
    borderColor: "rgba(254,0,0,.1) rgba(254,0,0,.2) #fe0000 !important",
    text: "x2",
    reward: 2
  },
  {
    id: 12,
    title: "Black",
    bgColor:
      "linear-gradient(143.5deg,#434343 10.92%,#141414 81.42%)!important",
    borderColor:
      "hsla(0,0%,61.6%,.05) rgba(32,32,32,.9) hsla(0,0%,61.6%,.1) !important",
    text: "x2",
    reward: 2
  },
  {
    id: 13,
    title: "Joker",
    bgColor:
      "linear-gradient(143.5deg,#0064ad 10.92%,#001b7b 81.42%)!important",
    borderColor:
      "rgba(0,163,254,.1) rgba(0,42,133,.9) rgba(0,163,254,.3) rgba(0,163,254,.2) !important",
    text: "x24",
    reward: 24
  },
];

export const OptionCategories: OptionCategoriesType[] = [
  {
    id: 14,
    title: "2-9",
    text: "x1.5",
    reward: 1.5
  },
  {
    id: 15,
    title: "JQKA",
    text: "x3",
    reward: 3
  },
  {
    id: 16,
    title: "KA",
    text: "x6",
    reward: 6
  },
  {
    id: 17,
    title: "A",
    text: "x12",
    reward: 12
  },
];

export const HiLoCategories: HiLoCategoriesType[] = [
  {
    id: 18,
    title: "HI",
    text: "hi-tab",
    reward: 2
  },
  {
    id: 19,
    title: "LO",
    text: "lo-tab",
    reward: 2
  },
];

export const HiLoCalc: HiLoCalcType[] = [
  {
    prevId: 0,
    hPercent: 0,
    lPercent: 96,
    hMulti: 0,
    lMulti: 1.03
  },
  {
    prevId: 1,
    hPercent: 88,
    lPercent: 0,
    hMulti: 1.09,
    lMulti: 0
  },
  {
    prevId: 2,
    hPercent: 80,
    lPercent: 8,
    hMulti: 1.2,
    lMulti: 12
  },
  {
    prevId: 3,
    hPercent: 72,
    lPercent: 16,
    hMulti: 1.33,
    lMulti: 6
  },
  {
    prevId: 4,
    hPercent: 64,
    lPercent: 24,
    hMulti: 1.5,
    lMulti: 4
  },
  {
    prevId: 5,
    hPercent: 56,
    lPercent: 32,
    hMulti: 1.71,
    lMulti: 3
  },
  {
    prevId: 6,
    hPercent: 48,
    lPercent: 40,
    hMulti: 2,
    lMulti: 2.4
  },
  {
    prevId: 7,
    hPercent: 40,
    lPercent: 48,
    hMulti: 2.4,
    lMulti: 2
  },
  {
    prevId: 8,
    hPercent: 32,
    lPercent: 56,
    hMulti: 3,
    lMulti: 1.71
  },
  {
    prevId: 9,
    hPercent: 24,
    lPercent: 64,
    hMulti: 4,
    lMulti: 1.5
  },
  {
    prevId: 10,
    hPercent: 16,
    lPercent: 72,
    hMulti: 6,
    lMulti: 1.33
  },
  {
    prevId: 11,
    hPercent: 8,
    lPercent: 80,
    hMulti: 12,
    lMulti: 1.2
  },
  {
    prevId: 12,
    hPercent: 0,
    lPercent: 88,
    hMulti: 0,
    lMulti: 1.09
  }
];

export const KeyboardNumbers: KeyboardNumbersType[] = [
  { id: 1, title: "1", amount: 1 },
  { id: 2, title: "2", amount: 2 },
  { id: 3, title: "3", amount: 3 },
  { id: 4, title: "4", amount: 4 },
  { id: 5, title: "5", amount: 5 },
  { id: 6, title: "6", amount: 6 },
  { id: 7, title: "7", amount: 7 },
  { id: 8, title: "8", amount: 8 },
  { id: 9, title: "9", amount: 9 },
  { id: 10, title: "50", amount: 50 },
  { id: 11, title: "100", amount: 100 },
  { id: 12, title: "1k", amount: 1000 },
  { id: 13, title: "5k", amount: 10000 },
];

export const HistoryCards: HistoryCardsType[] = [
  { id: 5, title: "5", flag: 1 },
  { id: 0, title: "@", flag: 2 },
  { id: 1, title: "A", flag: 2 },
  { id: 3, title: "3", flag: 2 },
  { id: 2, title: "2", flag: 1 },
  { id: 4, title: "4", flag: 1 },
  { id: 5, title: "5", flag: 1 },
  { id: 7, title: "7", flag: 2 },
  { id: 6, title: "6", flag: 1 },
  { id: 9, title: "9", flag: 2 },
  { id: 8, title: "8", flag: 1 },
  { id: 10, title: "J", flag: 1 },
  { id: 11, title: "Q", flag: 1 },
  { id: 13, title: "A", flag: 2 },
  { id: 12, title: "K", flag: 1 },
  { id: 0, title: "@", flag: 2 },
  { id: 1, title: "A", flag: 2 },
  { id: 3, title: "3", flag: 2 },
  { id: 2, title: "2", flag: 1 },
  { id: 4, title: "4", flag: 1 },
  { id: 5, title: "5", flag: 1 },
  { id: 7, title: "7", flag: 2 },
  { id: 6, title: "6", flag: 1 },
  { id: 9, title: "9", flag: 2 },
  { id: 8, title: "8", flag: 1 },
  { id: 10, title: "J", flag: 1 },
  { id: 11, title: "Q", flag: 1 },
  { id: 13, title: "A", flag: 2 },
  { id: 12, title: "K", flag: 1 },
  { id: 0, title: "@", flag: 2 },
  { id: 1, title: "A", flag: 2 },
  { id: 3, title: "3", flag: 2 },
  { id: 2, title: "2", flag: 1 },
  { id: 4, title: "4", flag: 1 },
  { id: 5, title: "5", flag: 1 },
  { id: 7, title: "7", flag: 2 },
  { id: 6, title: "6", flag: 1 },
  { id: 9, title: "9", flag: 2 },
  { id: 8, title: "8", flag: 1 },
  { id: 10, title: "J", flag: 1 },
  { id: 11, title: "Q", flag: 1 },
  { id: 13, title: "A", flag: 2 },
  { id: 12, title: "K", flag: 1 },
  { id: 0, title: "@", flag: 2 },
  { id: 1, title: "A", flag: 2 },
  { id: 3, title: "3", flag: 2 },
  { id: 2, title: "2", flag: 1 },
  { id: 4, title: "4", flag: 1 },
  { id: 5, title: "5", flag: 1 },
  { id: 7, title: "7", flag: 2 },
  { id: 6, title: "6", flag: 1 },
  { id: 9, title: "9", flag: 2 },
  { id: 8, title: "8", flag: 1 },
  { id: 10, title: "J", flag: 1 },
  { id: 11, title: "Q", flag: 1 },
  { id: 13, title: "A", flag: 2 },
  { id: 12, title: "K", flag: 2 },
]
