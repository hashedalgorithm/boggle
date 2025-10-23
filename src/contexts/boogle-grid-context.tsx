"use client";

import { uuid } from "@/lib/utils";
import { TDice, TDiceStatus } from "@/types/core";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type BoogleGridProviderProps = PropsWithChildren;

type Actions =
  | {
      type: "start-tracing";
      diceId: string;
    }
  | {
      type: "update-dice-status";
      diceId: string;
      status: TDiceStatus;
    }
  | {
      type: "end-tracing";
    };

type BoogleGridState = {
  dices: Record<string, TDice>;
  isTracing: boolean;
  recentDiceId: string | null;
  path: string[];
};
type BoogleGridContextState = {
  state: BoogleGridState;
  dispatch: Dispatch<Actions>;
};

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWX";
const getInitialValue = () =>
  ({
    dices: Array.from(Array(16).keys()).reduce((accumulator, value) => {
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      const uid = uuid();
      accumulator[uid] = {
        diceId: uid,
        diceLabel: alphabets[randomIndex],
        dicePosition: value,
        diceValue: alphabets[randomIndex].toLowerCase(),
        diceStatus: "idle",
      } satisfies TDice;
      return accumulator;
    }, {} as Record<string, TDice>),

    isTracing: false,
    recentDiceId: null,
    path: [],
  } satisfies BoogleGridState);

const RawContext = createContext<BoogleGridContextState>({
  state: getInitialValue(),
  dispatch: () => {},
});

export const useBoogleGridContext = () => useContext(RawContext);

export const useBoogleGridContextUtils = () => {
  const { state } = useBoogleGridContext();


  const checkIsDiceAlreadyTraced = (diceId: string) => {
    return state.path.includes(diceId);
  };

  const getWordWithPath = (): string => {
    let tracedWord = "";

    for (const diceId of state.path) {
      tracedWord += state.dices[diceId].diceValue;
    }

    return tracedWord;
  };

  return {
    checkIsDiceTraceable,
    checkIsDiceAlreadyTraced,
    getWordWithPath,
  };
};

const reducer = (
  prevstate: BoogleGridState,
  actions: Actions
): BoogleGridState => {
  switch (actions.type) {
    case "start-tracing":
      return {
        ...prevstate,
        dices: {
          ...prevstate.dices,
          [actions.diceId]: {
            ...prevstate.dices[actions.diceId],
            diceStatus: "active",
          },
        },
        isTracing: true,
        path: [actions.diceId],
        recentDiceId: actions.diceId,
      };
    case "end-tracing":
      const transformedDices = Object.values(prevstate.dices).reduce(
        (accumulator, dice) => {
          accumulator[dice.diceId] = prevstate.path.includes(dice.diceId)
            ? ({
                ...dice,
                diceStatus: "idle",
              } satisfies TDice)
            : dice;

          return accumulator;
        },
        {} as Record<string, TDice>
      );
      return {
        ...prevstate,
        dices: transformedDices,
        isTracing: false,
        path: [],
      };
    case "update-dice-status":
      return {
        ...prevstate,
        dices: {
          ...prevstate.dices,
          [actions.diceId]: {
            ...prevstate.dices[actions.diceId],
            diceStatus: actions.status,
          },
        },
        path: [...prevstate.path, actions.diceId],
        recentDiceId: actions.diceId,
      };
    default:
      return prevstate;
  }
};

const BoogleGridProvider = ({ children }: BoogleGridProviderProps) => {
  const { state: gameConfig } = useGameContext();
  const [state, dispatch] = useReducer(
    reducer,
    getInitialValue(gameConfig.gridSize.rows, gameConfig.gridSize.columns)
  );
  return (
    <RawContext.Provider value={{ state, dispatch }}>
      {children}
    </RawContext.Provider>
  );
};

export default BoogleGridProvider;
