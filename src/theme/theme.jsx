import React from 'react';
import  { createTheme } from '@mui/material/styles';


const getTheme = (mode) => {
  let primary, primaryHover, secondary, secondaryHover, background, paper, textPrimary, textSecondary, border, borderShadow;


  if (mode === 'light') {
    primary = '#1976d2';
    primaryHover = '#e6e6e6'; 
    secondary = '#c62828';
    secondaryHover = '#e6e6e6'; 
    background = '#f5f5f5';
    paper = '#ffffff';
    textPrimary = '#0d0d0d';
    textSecondary = '#424242';
    border = '#bdbdbd';
    borderShadow = "#bdbdbd";
  } else {
    primary = '#c62828';
    primaryHover = '#242424'; 
    secondary = '#ef9a9a';
    secondaryHover = '#171717'; 
    background = '#121212';
    paper = '#1c1c1c';
    textPrimary = '#e0e0e0';
    textSecondary = '#9e9e9e';
    border = '#424242';
    borderShadow = "#505050";
  }

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
        light: primaryHover,
      },
      secondary: {
        main: secondary,
        light: secondaryHover, 
      },
      background: {
        default: background,
        paper: paper,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
    },
    custom: { 
      border: { main: border,
                
       },
       borderShadow: {main: borderShadow}
    },
    typography: {
      fontFamily: [
        'Inter',
        'Gordita',
        'sans-serif'
      ].join(','),
    },
  });
};
// xs - up to 600px
// sm - 600px to 900px
// md - 900px to 1200px
// lg - 1200px and up

export default getTheme;