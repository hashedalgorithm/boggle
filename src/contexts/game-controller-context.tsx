"use client";

import { uuid } from "@/lib/utils";
import { validateWord } from "@/server/word-api";
import { TPlayer } from "@/types/core";

import {
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
      type: "set-active-player";
      playerId: string;
    }
  | {
      type: "update-player-status";
      playerId: string;
      status: TPlayer["playerStatus"];
    }
  | {
      type: "add-word";
      word: string;
      playerId: string;
    }
  | {
      type: "increase-time";
    }
  | {
      type: "decrease-time";
    }
  | {
      type: "increase-rows";
    }
  | {
      type: "decrease-rows";
    }
  | {
      type: "increase-columns";
    }
  | {
      type: "decrease-columns";
    }
  | {
      type: "change-language";
      language: GameControllerState["language"];
    }
  | {
      type: "start-game";
    }
  | {
      type: "end-game";
    }
  | {
      type: "reset-game";
    };

type GameControllerProviderProps = PropsWithChildren;

export type GameControllerState = {
  status: "active" | "idle";
  players: Record<string, TPlayer>;
  time: number;
  currentPlayerId: string | null;
  gridSize: {
    rows: number;
    columns: number;
  };
  language: "en" | "de" | "fr";
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
        playerStatus: "playing",
        playerWordsFound: [],
      },
    },
    status: "idle",
    currentPlayerId: uid,
    time: 3,
    gridSize: {
      rows: 5,
      columns: 5,
    },
    language: "en",
  } satisfies GameControllerState;
};
const RawContext = createContext<GameControllerContextState>({
  state: getInitialGameState(),
  dispatch: () => {},
});

const reducer = (
  prevstate: GameControllerState,
  actions: Actions,
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
            playerStatus: "waiting",
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
          .reduce(
            (accumulator, currentValue) => {
              accumulator[currentValue.playerId] = currentValue;
              return accumulator;
            },
            {} as Record<string, TPlayer>,
          ),
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
    case "increase-time":
      return {
        ...prevstate,
        time: prevstate.time + 1,
      };
    case "decrease-time":
      return {
        ...prevstate,
        time: prevstate.time - 1 > 1 ? prevstate.time - 1 : 1,
      };
    case "start-game":
      return { ...prevstate, status: "active" };
    case "end-game": {
      const firstPlayer = Object.values(prevstate.players).at(0);
      if (!firstPlayer) return prevstate;

      return {
        ...prevstate,
        status: "idle",
        currentPlayerId: null,
      };
    }
    case "reset-game": {
      const firstPlayer = Object.values(prevstate.players).at(0);
      if (!firstPlayer) return prevstate;

      return {
        ...prevstate,
        status: "idle",
        players: Object.values(prevstate.players).reduce(
          (accumulator, currentValue) => {
            accumulator[currentValue.playerId] = {
              ...currentValue,
              playerStatus:
                firstPlayer.playerId === currentValue.playerId
                  ? "playing"
                  : "waiting",
              playerWordsFound: [],
            };
            return accumulator;
          },
          {} as Record<string, TPlayer>,
        ),
        currentPlayerId: firstPlayer.playerId,
      };
    }

    case "increase-rows":
      return {
        ...prevstate,
        gridSize: {
          ...prevstate.gridSize,
          rows: prevstate.gridSize.rows + 1,
        },
      };
    case "decrease-rows":
      return {
        ...prevstate,
        gridSize: {
          ...prevstate.gridSize,
          rows: prevstate.gridSize.rows - 1,
        },
      };
    case "increase-columns":
      return {
        ...prevstate,
        gridSize: {
          ...prevstate.gridSize,
          columns: prevstate.gridSize.columns + 1,
        },
      };
    case "decrease-columns":
      return {
        ...prevstate,
        gridSize: {
          ...prevstate.gridSize,
          columns: prevstate.gridSize.columns - 1,
        },
      };
    case "set-active-player":
      return {
        ...prevstate,
        players: {
          ...prevstate.players,
          [actions.playerId]: {
            ...prevstate.players[actions.playerId],
            playerStatus: "playing",
          },
        },
        currentPlayerId: actions.playerId,
      };

    case "change-language":
      return {
        ...prevstate,
        language: actions.language,
      };
    case "update-player-status":
      return {
        ...prevstate,
        players: {
          ...prevstate.players,
          [actions.playerId]: {
            ...prevstate.players[actions.playerId],
            playerStatus: actions.status,
          },
        },
      };
    default:
      return prevstate;
  }
};

export const useGameContext = () => useContext(RawContext);

const calculateScore = (words: string[]) =>
  words.reduce((total, currentValue) => {
    if (currentValue.length <= 4 && currentValue.length >= 3) return total + 1;
    if (currentValue.length <= 5) return total + 2;
    if (currentValue.length <= 6) return total + 3;
    if (currentValue.length <= 7) return total + 5;
    if (currentValue.length >= 8) return total + 11;
    else return total;
  }, 0);

export const useGameContextUtils = () => {
  const { state, dispatch } = useGameContext();

  const getActivePlayer = (playerId: string) =>
    Object.values(state.players).find((player) => player.playerId === playerId);

  const getAllWordsFoundedSoFar = () =>
    Object.values(state.players).flatMap((player) => player.playerWordsFound);

  const addWordToPlayerInventory = async (playerId: string, word: string) => {
    if (word.length < 3) {
      toast.warning("Word length should be minimum 3!");
      return;
    }

    if (Object.keys(state.players).length > 1) {
      const wordsFoundSoFar = getAllWordsFoundedSoFar();

      if (wordsFoundSoFar.includes(word)) {
        toast.warning("Found already! Try again!");
        return;
      }
    }

    // The traced word will be sent to the server and checked against the given word list.
    const resp = await validateWord(state.language, word);
    if (!resp.status) {
      toast.warning("Not a valid word! Try again!");
      return;
    }

    dispatch({
      type: "add-word",
      playerId: playerId,
      word,
    });
  };

  const getPlayerScore = (playerId: string) => {
    const player = state.players[playerId];

    if (!player) return 0;

    return calculateScore(player.playerWordsFound);
  };

  const pickNextPlayer = () => {
    return Object.values(state.players).find(
      (player) => player.playerStatus === "waiting",
    );
  };

  return {
    getActivePlayer,
    addWordToPlayerInventory,
    getPlayerScore,
    pickNextPlayer,
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
