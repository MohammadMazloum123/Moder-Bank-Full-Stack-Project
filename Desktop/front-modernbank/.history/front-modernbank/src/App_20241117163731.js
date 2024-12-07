import React from "react";
import { Box} from "@mui/material";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./route/AppRoutes.tsx";


function App() {
  return (
    <Router>
      <Box>
        <NavBar/>
        <HomePage/>
      </Box>
      <AppRoutes/>
    </Router>
  );
}

export default App;
