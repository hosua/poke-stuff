import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PokemonPage } from "./pages/PokemonPage";

import { Button } from "react-bootstrap";

function App() {
  return (
    <div data-bs-theme="dark">
      <PokemonPage />
    </div>
  );
}

export default App;
