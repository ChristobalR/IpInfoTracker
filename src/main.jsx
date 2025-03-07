import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "./theme/theme.jsx";
import App from "./App";
import themeHandler from "./theme/setTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Root() {

  const { themeH, handleTheme } = themeHandler();
  const theme = getTheme(themeH ? "light" : "dark");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      
      <App theme={theme} handleTheme={handleTheme}/>
     
  
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
