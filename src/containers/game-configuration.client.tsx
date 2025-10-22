import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import GameConfigurationPlayer from "@/containers/game-configuration-player.client";
import { useGameContext } from "@/contexts/game-controller-context";
import { PlayCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

const GameConfiguration = () => {
  const { state, dispatch } = useGameContext();
  const { push } = useRouter();

  const handleOnAddPlayer: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({
      playerName: `Player ${Object.keys(state.players).length + 1}`,
      type: "add-player",
    });
  };

  const handleOnClickStartPlay: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({
      type: "start-game",
    });
    push("/play");
  };

  return (
    <section className="flex justify-center items-center flex-col">
      <p className="muted mb-6">Choose your configuration and start playing!</p>
      <div className="flex w-full gap-8 items-center justify-between">
        <p>Number of players</p>
        <ButtonGroup>
          <Button variant={"secondary"}>
            <p>{Object.keys(state.players).length}</p>
          </Button>
          <Button onClick={handleOnAddPlayer} variant={"secondary"}>
            <Plus />
          </Button>
        </ButtonGroup>
      </div>

      <Separator className="my-6" />

      {Object.values(state.players).map((player) => (
        <GameConfigurationPlayer
          key={`game-configuration.client.players.${player.playerId}`}
          playerId={player.playerId}
          playerName={player.playerName}
        />
      ))}

      <Button className="mt-8" onClick={handleOnClickStartPlay}>
        <PlayCircle />
        Play Game!
      </Button>
    </section>
  );
};

export default GameConfiguration;
