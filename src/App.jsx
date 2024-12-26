import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PokemonList } from "./pages/Pokemon";

import { Button, ThemeProvider } from "react-bootstrap";

function App() {
  return (
    <div data-bs-theme="dark">
      <PokemonList />
    </div>
  );
}

export default App;
