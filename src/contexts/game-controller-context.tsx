"use client";

import { uuid } from "@/lib/utils";
import { TPlayer } from "@/types/core";

import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type Actions =
  | {
      type: "add-player";
      playerName: string;
    }
  | {
      type: "remove-player";
      playerId: string;
    }
  | {
      type: "upate-player-name";
      playerId: string;
      playerName: string;
    }
  | {
      type: "start-game";
    }
  | {
      type: "end-game";
    };

type GameControllerProviderProps = PropsWithChildren;

type GameControllerState = {
  status: "active" | "idle";
  players: Record<string, TPlayer>;
};

type GameControllerContextState = {
  state: GameControllerState;
  dispatch: Dispatch<Actions>;
};

const getInitialGameState = () => {
  const uid = uuid();
  return {
    players: {
      [uid]: {
        playerId: uid,
        playerName: "Player 1",
        playerScore: 0,
        playerStatus: "idle",
        playerWordsFound: [],
      },
    },
    status: "idle",
  } satisfies GameControllerState;
};
const RawContext = createContext<GameControllerContextState>({
  state: getInitialGameState(),
  dispatch: () => {},
});

const reducer = (
  prevstate: GameControllerState,
  actions: Actions
): GameControllerState => {
  switch (actions.type) {
    case "add-player": {
      const playerId = uuid();
      return {
        ...prevstate,
        players: {
          ...prevstate.players,
          [playerId]: {
            playerId,
            playerName: actions.playerName,
            playerScore: 0,
            playerStatus: "idle",
            playerWordsFound: [],
          },
        },
      };
    }
    case "remove-player": {
      return {
        ...prevstate,
        players: Object.values(prevstate.players)
          .filter((player) => player.playerId !== actions.playerId)
          .reduce((accumulator, currentValue) => {
            accumulator[currentValue.playerId] = currentValue;
            return accumulator;
          }, {} as Record<string, TPlayer>),
      };
    }
    case "upate-player-name": {
      return {
        ...prevstate,
        players: {
          ...prevstate.players,
          [actions.playerId]: {
            ...prevstate.players[actions.playerId],
            playerName: actions.playerName,
          },
        },
      };
    }
    case "start-game":
      return prevstate;
    case "end-game":
      return prevstate;
    default:
      return prevstate;
  }
};

export const useGameContext = () => useContext(RawContext);

export const useGameContextUtils = () => {
  const { state } = useGameContext();

  const getPlayer = (playerId: string) =>
    Object.values(state.players).find((player) => player.playerId === playerId);

  const getPlayers = () => Object.values(state.players);
  return {
    getPlayer,
    getPlayers,
  };
};

const GameControllerProvider = ({ children }: GameControllerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialGameState());

  return (
    <RawContext.Provider value={{ state, dispatch }}>
      {children}
    </RawContext.Provider>
  );
};

export default GameControllerProvider;
