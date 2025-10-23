"use client";

import { useGameContext } from "@/contexts/game-controller-context";
import { uuid } from "@/lib/utils";
import { TDice, TDiceStatus } from "@/types/core";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useCallback,
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
  currentDiceId: string | null;
  path: string[];
};
type BoogleGridContextState = {
  state: BoogleGridState;
  dispatch: Dispatch<Actions>;
};
type TCoordinates = {
  x: number;
  y: number;
};

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWX";
const getInitialValue = (rows: number, cols: number) =>
  ({
    dices: Array.from(Array(rows * cols).keys()).reduce(
      (accumulator, value) => {
        const randomIndex = Math.floor(Math.random() * alphabets.length);
        const uid = uuid();
        accumulator[uid] = {
          diceId: uid,
          diceLabel: alphabets[randomIndex],
          dicePosition: {
            x: Math.floor(value / rows),
            y: value % cols,
            position: value,
          },
          diceValue: alphabets[randomIndex].toLowerCase(),
          diceStatus: "idle",
        } satisfies TDice;
        return accumulator;
      },
      {} as Record<string, TDice>
    ),
    isTracing: false,
    currentDiceId: null,
    path: [],
  } satisfies BoogleGridState);

const RawContext = createContext<BoogleGridContextState>({
  state: getInitialValue(4, 4),
  dispatch: () => {},
});

export const useBoogleGridContext = () => useContext(RawContext);

export const useBoogleGridContextUtils = () => {
  const { state } = useBoogleGridContext();

  const getDice = useCallback(
    (diceId: string) =>
      Object.values(state.dices).find((dice) => dice.diceId === diceId),
    [state.dices]
  );

  const getAllowedPositions = useCallback((position: TDice["dicePosition"]) => {
    const allowedTraceableAdajacentPositions: Array<TCoordinates> = [];

    // (x-1)(y-1)
    const topLeft = {
      x: position.x - 1,
      y: position.y - 1,
    } satisfies TCoordinates;

    // (x-1)(y)
    const topCenter = {
      x: position.x - 1,
      y: position.y,
    } satisfies TCoordinates;

    // (x-1)(y+1)
    const topRight = {
      x: position.x - 1,
      y: position.y + 1,
    } satisfies TCoordinates;

    // (x)(y-1)
    const left = { x: position.x, y: position.y - 1 } satisfies TCoordinates;

    // (x)(y+1)
    const right = { x: position.x, y: position.y + 1 } satisfies TCoordinates;

    // (x-1)(y-1)
    const bottomLeft = {
      x: position.x + 1,
      y: position.y - 1,
    } satisfies TCoordinates;

    // (x-1)(y)
    const bottomCenter = {
      x: position.x + 1,
      y: position.y,
    } satisfies TCoordinates;

    // (x+1)(y+1)
    const bottomRight = {
      x: position.x + 1,
      y: position.y + 1,
    } satisfies TCoordinates;

    if (topLeft.x >= 0 && topLeft.y >= 0)
      allowedTraceableAdajacentPositions.push(topLeft);
    if (topCenter.x >= 0 && topCenter.y >= 0)
      allowedTraceableAdajacentPositions.push(topCenter);
    if (topRight.x >= 0 && topRight.y >= 0)
      allowedTraceableAdajacentPositions.push(topRight);
    if (left.x >= 0 && left.y >= 0)
      allowedTraceableAdajacentPositions.push(left);
    if (right.x >= 0 && right.y >= 0)
      allowedTraceableAdajacentPositions.push(right);
    if (bottomLeft.x >= 0 && bottomLeft.y >= 0)
      allowedTraceableAdajacentPositions.push(bottomLeft);
    if (bottomCenter.x >= 0 && bottomCenter.y >= 0)
      allowedTraceableAdajacentPositions.push(bottomCenter);
    if (bottomRight.x >= 0 && bottomRight.y >= 0)
      allowedTraceableAdajacentPositions.push(bottomRight);

    return allowedTraceableAdajacentPositions;
  }, []);

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
    getDice,
    getAllowedPositions,
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
        currentDiceId: actions.diceId,
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
        currentDiceId: null,
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
        currentDiceId: actions.diceId,
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
