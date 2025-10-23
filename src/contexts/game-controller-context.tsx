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
import { toast } from "sonner";

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
      type: "add-word";
      word: string;
      playerId: string;
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
    case "add-word":
      return {
        ...prevstate,
        players: {
          ...prevstate.players,
          [actions.playerId]: {
            ...prevstate.players[actions.playerId],
            playerWordsFound: [
              ...prevstate.players[actions.playerId].playerWordsFound,
              actions.word,
            ],
          },
        },
      };
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
  const { state, dispatch } = useGameContext();

  const getActivePlayer = () =>
    Object.values(state.players).find(
      (player) => player.playerStatus === "active"
    );

  const getPlayers = () => Object.values(state.players);

  const addWordToPlayerInventory = (playerId: string, word: string) => {
    if (word.length < 3) {
      toast.warning("Word length should be minimum 3!");
      return;
    }

    dispatch({
      type: "add-word",
      playerId: playerId,
      word,
    });
  };

  return {
    getPlayers,
    getActivePlayer,
    addWordToPlayerInventory,
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
