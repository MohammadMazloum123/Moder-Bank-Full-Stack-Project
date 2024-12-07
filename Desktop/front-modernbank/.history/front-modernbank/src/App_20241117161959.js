import React from "react";
import { Box} from "@mui/material";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Box>
      <NavBar/>
      <HomePage/>
    </Box>
  );
}

export default App;
