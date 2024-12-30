import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import noAvator from "../../assets/Image/no-avatar.jpg";
function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="sm" sx={{ height: 64, padding: 1 }}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              sx={{ width: 48, height: 48 }}
              alt="No Avatar"
              src={noAvator}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
