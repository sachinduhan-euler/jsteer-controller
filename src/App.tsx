import React, { useState } from "react";
import JoyStickController from "./lgtc-axes/JoyStickController";

function App() {
  const [handController, setHandController] = useState(false);
  return (
    <div className="container bg-light rounded mt-4 text-dark py-5">
      <h2 className="text-center text-info">Controller state</h2>
        <JoyStickController isHandStickActive={handController} />
        <div className="d-flex align-items-center justify-content-end">
          <input type="checkbox" onChange={(event) => setHandController(event.target.checked)} />
          <div className="px-2">Activate Handstick</div>
        </div>
    </div>
  );
}

export default App;
