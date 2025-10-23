import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import GameConfigurationPlayer from "@/containers/game-configuration-player.client";
import { useGameContext } from "@/contexts/game-controller-context";
import { Minus, PlayCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { toast } from "sonner";

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

  const handleOnClickIncreaseTime: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch({
      type: "increase-time",
    });
  };
  const handleOnClickDecreaseTime: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (state.time < 1) {
      toast.warning("Minimum is time period is 1 minute!");
      return;
    }

    dispatch({
      type: "decrease-time",
    });
  };

  const handleOnClickIncreaseRowsInGrid: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (state.gridSize.rows >= 12) return;
    dispatch({
      type: "increase-rows",
    });
  };
  const handleOnClickDecreaseRowsInGrid: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (state.gridSize.rows <= 4) return;
    dispatch({
      type: "decrease-rows",
    });
  };
  const handleOnClickIncreaseColumnsInGrid: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (state.gridSize.rows >= 12) return;
    dispatch({
      type: "increase-columns",
    });
  };
  const handleOnClickDecreaseColumnsInGrid: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (state.gridSize.rows <= 4) return;
    dispatch({
      type: "decrease-columns",
    });
  };

  return (
    <section className="flex justify-center items-center flex-col">
      <p className="muted mb-6">Choose your configuration and start playing!</p>
      <div className="flex flex-col gap-4 w-full">
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
        <div className="flex w-full gap-8 items-center justify-between">
          <p>Time per round</p>
          <ButtonGroup>
            <Button
              variant={"secondary"}
              onClick={handleOnClickDecreaseTime}
              disabled={state.time <= 1}
            >
              <Minus />
            </Button>
            <Button variant={"secondary"}>
              <p>{`${state.time} min`}</p>
            </Button>
            <Button onClick={handleOnClickIncreaseTime} variant={"secondary"}>
              <Plus />
            </Button>
          </ButtonGroup>
        </div>
        <Separator />
        <div className="flex w-full gap-8 items-center justify-between">
          <p>Grid Size</p>
          <div className="flex flex-col gap-2">
            <ButtonGroup>
              <Button
                variant={"secondary"}
                onClick={handleOnClickDecreaseRowsInGrid}
                disabled={state.gridSize.rows <= 4}
              >
                <Minus />
              </Button>
              <Button variant={"secondary"}>
                <p>{`${state.gridSize.rows}`}</p>
              </Button>
              <Button
                onClick={handleOnClickIncreaseRowsInGrid}
                variant={"secondary"}
                disabled={state.gridSize.rows >= 12}
              >
                <Plus />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                variant={"secondary"}
                onClick={handleOnClickDecreaseColumnsInGrid}
                disabled={state.gridSize.columns <= 4}
              >
                <Minus />
              </Button>
              <Button variant={"secondary"}>
                <p>{`${state.gridSize.columns}`}</p>
              </Button>
              <Button
                onClick={handleOnClickIncreaseColumnsInGrid}
                variant={"secondary"}
                disabled={state.gridSize.columns >= 12}
              >
                <Plus />
              </Button>
            </ButtonGroup>
          </div>
        </div>
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
