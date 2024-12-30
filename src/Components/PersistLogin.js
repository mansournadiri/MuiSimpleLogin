import { Outlet } from "react-router-dom";
import { Stack, CircularProgress, Grid2 } from "@mui/material";
import { useState, useEffect } from "react";
import useRefreshToken from "../api/useRefreshToken";
import useAuth from "../context/useAuth";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.jwtToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth.jwtToken, refresh]);

  return (
    <>
      {isLoading ? (
        <Grid2 size={12}>
          <Stack sx={{ backgroundColor: "paper", height: "100vh" }}>
            <CircularProgress color="success" sx={{ margin: "auto" }} />
          </Stack>
        </Grid2>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default PersistLogin;
