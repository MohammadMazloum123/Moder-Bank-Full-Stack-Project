import React from "react";
import { Box, Stack } from "@mui/material";
import SideBar from "./components/SideBar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Box>
      <Stack>
        <SideBar/>
        <HomePage/>
      </Stack>
    </Box>
  );
}

export default App;
