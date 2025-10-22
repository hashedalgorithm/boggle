"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { useGameContext } from "@/contexts/game-controller-context";
import { TPlayer } from "@/types/core";
import { Edit, Save, Trash2 } from "lucide-react";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

type GameConfigurationPlayerProps = Pick<TPlayer, "playerId" | "playerName">;
const GameConfigurationPlayer = ({
  playerId,
  playerName,
}: GameConfigurationPlayerProps) => {
  const { state, dispatch } = useGameContext();
  const [showNameInput, setShowNameInput] = useState(false);

  const handleTogglePlayerNameInput: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setShowNameInput(!showNameInput);
  };

  const handleOnChangeNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: "upate-player-name",
      playerId,
      playerName: e.currentTarget.value.toString(),
    });
  };

  const handleOnDeletePlayer: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({
      type: "remove-player",
      playerId,
    });
  };

  return (
    <section className="w-96 flex justify-between gap-8 items-center py-4 px-3 hover:bg-accent/40 hover:rounded-md">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        {showNameInput ? (
          <Input
            name="name"
            onChange={handleOnChangeNameInput}
            placeholder="Your game name!"
            value={playerName}
          />
        ) : (
          <p>{playerName}</p>
        )}
      </div>

      <ButtonGroup>
        <Button variant="ghost" onClick={handleTogglePlayerNameInput}>
          {showNameInput ? <Save /> : <Edit />}
        </Button>
        {Object.keys(state.players).length > 1 && !showNameInput && (
          <Button variant="ghost" onClick={handleOnDeletePlayer}>
            <Trash2 />
          </Button>
        )}
      </ButtonGroup>
    </section>
  );
};

export default GameConfigurationPlayer;
