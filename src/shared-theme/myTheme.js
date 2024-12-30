import { createTheme } from "@mui/material";
import { indigo, cyan, green, red } from "@mui/material/colors";

export const myTheme = createTheme({
  palette: {
    primary: {
      light: "#efefef",
      main: indigo[500],
      dark: "#002884",
      contrastText: "#fff",
      error: red[500],
      success: green[500],
    },
    secondary: {
      light: "#ff7961",
      main: cyan[500],
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});
