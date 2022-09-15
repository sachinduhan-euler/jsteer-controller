import React from "react";
import JoyStickController from "./lgtc-axes/JoyStickController";

function App() {
  return (
    <div className="container bg-light rounded mt-4 text-dark py-5">
      <h2 className="text-center text-info">Controller state</h2>
      <JoyStickController />
    </div>
  );
}

export default App;
