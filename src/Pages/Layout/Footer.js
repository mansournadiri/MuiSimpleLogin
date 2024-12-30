import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from "@mui/material";
import useSingOut from "../../Hooks/useSingOut";
import LogoutIcon from "@mui/icons-material/Logout";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ChecklistIcon from "@mui/icons-material/Checklist";
import HomeIcon from "@mui/icons-material/Home";

export default function Footer({ activeMenu }) {
  const navigate = useNavigate();
  const signout = useSingOut();
  const closeSession = async () => {
    await signout();
    navigate("/auth/sign-in");
  };
  const tabs = [
    { title: "صفحه اصلی", link: "/", icon: <HomeIcon /> },
    { title: "خود اظهاری", link: "/user/request", icon: <ChecklistIcon /> },
    { title: "گزارشات", link: "/user/report", icon: <SummarizeIcon /> },
  ];

  const [value, setValue] = React.useState({ activeMenu });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabsmenu = tabs?.map((tab, i) => {
    return (
      <BottomNavigationAction
        key={i}
        component={Link}
        to={tab.link}
        label={
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {tab.title}
          </Typography>
        }
        value={tab.link}
        icon={tab.icon}
      />
    );
  });
  return (
    <Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
          maxWidth: "100vh",
        }}
        elevation={3}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {tabsmenu}
          <BottomNavigationAction
            key="3"
            component={Link}
            label={
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                خروج
              </Typography>
            }
            value="signout"
            icon={<LogoutIcon />}
            onClick={closeSession}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
