import useAuth from "../context/useAuth";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Alert,
  Grid2,
  Divider,
  Chip,
} from "@mui/material";

export function Home() {
  const { auth } = useAuth();
  return (
    <Grid2 container>
      <Grid2 size={12} sx={{ margin: "15px" }}>
        {!auth?.user?.isActive ? (
          <>
            <Stack
              sx={{
                width: "100%",
                marginBottom: "15px;",
              }}
              spacing={2}
            >
              <Alert severity="warning" sx={{ borderRadius: "15px" }}>
                حساب کاربری شما هنوز فعال نشده است.
              </Alert>
            </Stack>
          </>
        ) : (
          <>
            <Stack
              sx={{
                width: "100%",
                marginBottom: "15px;",
              }}
              spacing={2}
            >
              <Alert severity="success" sx={{ borderRadius: "15px" }}>
                حساب کاربری شما فعال شده است.
              </Alert>
            </Stack>
          </>
        )}
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{ borderRadius: "15px" }}
        >
          <CardContent>
            <Typography variant="h6">{auth?.user?.fullName}</Typography>
            <Divider>
              <Chip
                label="سایر اطلاعات"
                size="medium"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              />
            </Divider>
            <Typography variant="body1" sx={{ marginBottom: "7px" }}>
              <Typography component={"span"} sx={{ fontWeight: "bold" }}>
                کدملی :{" "}
              </Typography>
              {auth?.user?.nationalId}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "7px" }}>
              <Typography component={"span"} sx={{ fontWeight: "bold" }}>
                تلفن همراه :{" "}
              </Typography>
              {auth?.user?.mobileNumber}
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
export default Home;
