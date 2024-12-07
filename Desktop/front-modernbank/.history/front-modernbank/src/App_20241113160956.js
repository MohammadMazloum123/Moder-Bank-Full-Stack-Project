import React from "react";
import { Box, Stack } from "@mui/material";
import SideBar from "./components/SideBar";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Box>
      <NavBar/>
      <Stack direction="row" spacing={2}>
        <SideBar/>
        <HomePage/>
      </Stack>
    </Box>
  );
}

export default App;
