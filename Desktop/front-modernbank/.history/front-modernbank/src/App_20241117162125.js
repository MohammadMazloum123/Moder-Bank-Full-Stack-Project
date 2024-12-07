import React from "react";
import { Box} from "@mui/material";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router></Router>
    <Box>
      <NavBar/>
      <HomePage/>
    </Box>
  );
}

export default App;
