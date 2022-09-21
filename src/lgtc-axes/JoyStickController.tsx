import React, { useLayoutEffect, useState } from "react";
import RenderIf from "../util/RenderIf";
import { VechicleMovement, JoyControllerMainPros } from "./types";

type JoyStickControllerProps = {
  isHandStickActive: boolean
}

function JoyStickController(props: JoyStickControllerProps = {isHandStickActive : false}): JSX.Element {
  const [connectedGamepad, setConnectedGamepad] = useState<Gamepad | null>(
    null
  );
  const [movementState, setMovementState] = useState<VechicleMovement>({
    linear: 0,
    angular: 0,
  });

  const { isHandStickActive } = props;
  useLayoutEffect(() => {
    (function checkAvailableGamePads() {
      requestAnimationFrame(checkAvailableGamePads);
      const newGamepad = navigator.getGamepads()[0];
      if (!newGamepad) return;

      const linearIndex = isHandStickActive ? 1 : 3, angularIndex = isHandStickActive ? 0 : 2;
      console.log(isHandStickActive, newGamepad.axes);
      setMovementState({
        linear: -parseFloat(newGamepad.axes[linearIndex].toFixed(2)),
        angular: parseFloat(newGamepad.axes[angularIndex].toFixed(2)),
      });

      setConnectedGamepad(newGamepad);
    })();

  }, []);

  return (
    <>
      <RenderIf component={NoController()} showComponent={!connectedGamepad} />
      <RenderIf
        component={__JoyStickControllerMain({
          vehicleMovemnet: movementState,
        })}
        showComponent={!!connectedGamepad}
      />
    </>
  );
}

function __JoyStickControllerMain(props: JoyControllerMainPros): JSX.Element {
  const { vehicleMovemnet } = props;

  return (
    <div className="d-flex align-items-center flex-column">
      <table
        className="table mt-2 table-bordered"
        style={{ maxWidth: "560px" }}
      >
        <thead>
          <tr>
            <th scope="col">Linear velocity</th>
            <th scope="col">Angular velocity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{vehicleMovemnet.linear}</td>
            <td>{vehicleMovemnet.angular}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function NoController(): JSX.Element {
  return (
    <>
      <h5 className="text-center mt-5">No controller found</h5>
      <p className="text-secondary text-center">
        Consider moving plugging in the USB or move the keys of the joystick.
      </p>
      <div className="bg-light d-flex justify-content-center p-3">
        <button disabled className="btn btn-dark">
          Checking controller...
        </button>
      </div>
    </>
  );
}

export default JoyStickController;
