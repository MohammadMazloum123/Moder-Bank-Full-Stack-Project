import React from "react";
import { Box} from "@mui/material";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./route/AppRoutes.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { BankingProvider } from "./contexts/BankingContext.tsx";

function App() {
  return (
<AuthProvider>
  <B
</AuthProvider>
    <Router>
      <Box>
        <NavBar/>
      </Box>
      <AppRoutes/>
    </Router>
  );
}

export default App;
