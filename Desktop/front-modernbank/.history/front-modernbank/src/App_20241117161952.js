import React from "react";
import { Box} from "@mui/material";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import {BrowserRouter} from "react"
function App() {
  return (
    <Box>
      <NavBar/>
      <HomePage/>
    </Box>
  );
}

export default App;
