import React from "react";
import { Box} from "@mui/material";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar.tsx";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./route/AppRoutes.tsx";


function App() {
  return (
    <Router>
      <AppRoutes/>
      <Box>
        <NavBar/>
        <HomePage/>
      </Box>
    </Router>
  );
}

export default App;
