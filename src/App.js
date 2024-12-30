import { AppRoutes } from "./Routes/appRoutes";
import { Container, Grid2 } from "@mui/material";

function App() {
  return (
    <Container disableGutters maxWidth="sm">
      <Grid2 container sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
        <AppRoutes />
      </Grid2>
    </Container>
  );
}

export default App;
