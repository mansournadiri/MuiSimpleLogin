import { Grid2 } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { myTheme } from "../../shared-theme/myTheme";
import { ThemeProvider } from "@emotion/react";

export function Layout() {
  const location = useLocation();
  const activeMenu = location.pathname;
  return (
    <ThemeProvider theme={myTheme}>
      <Header />
      <Grid2 size={12} minHeight="100vh" sx={{ paddingBottom: 5 }}>
        <Outlet />
      </Grid2>
      <Footer activeMenu={activeMenu} />
    </ThemeProvider>
  );
}
export default Layout;
