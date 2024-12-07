import React from "react";
import { Box} from "@mui/material";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./route/AppRoutes";
function App() {
  return (
    <Router>
      <Box>
        <NavBar/>
        <HomePage/>
      </Box>
    </Router>
  );
}

export default App;
