import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Link,
  FormControl,
  Box,
  Button,
  Divider,
  FormLabel,
  Stack,
  Grid2,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CodeIcon from "@mui/icons-material/Code";
import { myTheme } from "../../shared-theme/myTheme";
import { muiModal as MessageModal } from "../../Hooks/useModal";
import axios from "../../api/useAxios";
import useAuth from "../../context/useAuth";

export function SignIn() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const afterLoginPathLocation = location?.state?.from?.pathname || "/";

  const [error, setError] = React.useState(true);
  const [errorTitle, setErrorTitle] = React.useState("");
  const [errorBody, setErrorBody] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userError, setUserError] = React.useState(false);
  const [userErrorMessage, setUserErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [codeError, setCodeError] = React.useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = React.useState("");

  const [otp, setOtp] = React.useState(false);
  const [userMobile, setUserMobile] = React.useState("");
  const [userGuid, setUserGuid] = React.useState("");

  const code_Regex = /^[0-9]{4}/;
  const nationalId_Regex = /^[0-9]{10}/;
  const pwd_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$$%]).{8,24}$/;

  const validateInputs = () => {
    const password = document.getElementById("password");
    const user = document.getElementById("user");
    let isValid = true;
    if (!password.value || !pwd_Regex.test(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "کلمه عبور ضعیف است، حداقل 8 کاراکتر و شامل حروف، اعداد و کاراکتر خاص باشد."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    if (!user.value || !nationalId_Regex.test(user.value)) {
      setUserError(true);
      setUserErrorMessage("کد ملی وارد شده اشتباه است.");
      isValid = false;
    } else {
      setUserError(false);
      setUserErrorMessage("");
    }
    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true);
    const data = new FormData(event.currentTarget);
    const apiUrl = process.env.REACT_APP_Login_API_URL;
    try {
      const result = await axios.post(
        apiUrl,
        {
          nationalId: data.get("user"),
          password: data.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const response = result.data;
      if (response.succeeded) {
        setLoading(false);
        setOtp(true);
        setUserMobile(response.data.mobile);
        setUserGuid(response.data.userGuid);
      } else {
        setLoading(false);
        setOtp(false);
        setUserMobile("");
        setError(true);
        setErrorTitle("خطا!");
        setErrorBody(response.message);
        handleOpen();
      }
    } catch (err) {
      setLoading(false);
      setOtp(false);
      setUserMobile("");
      setError(true);
      setErrorTitle("خطا!");
      if (!err?.response) setErrorBody("پاسخی از سمت سرور دریافت نشد");
      else if (err.response?.data) setErrorBody(err.response?.data.message);
      else setErrorBody("عملیات انجام نشد، لطفاً مجددا تلاش نمایید.");
      handleOpen();
    }
  };

  const validateOtpInputs = () => {
    const code = document.getElementById("code");
    let isValid = true;
    if (!code.value || !code_Regex.test(code.value)) {
      setCodeError(true);
      setCodeErrorMessage("کد اعتبارسنجی وارد شده اشتباه است.");
      isValid = false;
    } else {
      setCodeError(false);
      setCodeErrorMessage("");
    }
    return isValid;
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateOtpInputs();
    if (!isValid) {
      return;
    }
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const apiUrl = process.env.REACT_APP_Confirm_API_URL;
    try {
      const result = await axios.post(
        apiUrl,
        {
          mobile: userMobile,
          userGuid: userGuid,
          code: data.get("code"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const response = result.data;
      if (response.succeeded) {
        const user = response?.data.data;
        const jwtToken = response?.data.jwtToken;
        const roles = response?.data.roles;
        localStorage.setItem("jwtToken", jwtToken);
        setAuth({ user, jwtToken, roles });
        navigate(afterLoginPathLocation, { replace: true });
      } else {
        setLoading(false);
        setError(true);
        setErrorTitle("خطا!");
        setErrorBody(response.message);
        handleOpen();
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      setErrorTitle("خطا!");
      if (!err?.response) setErrorBody("پاسخی از سمت سرور دریافت نشد");
      else if (err.response?.data) setErrorBody(err.response?.data.message);
      else setErrorBody("عملیات انجام نشد، لطفاً مجددا تلاش نمایید.");
      handleOpen();
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Container direction="column">
        <MessageModal
          isOpen={open}
          onClose={handleClose}
          title={errorTitle}
          body={errorBody}
          isError={error}
        ></MessageModal>

        {!otp ? (
          <Box variant="outlined" padding={4}>
            <Grid2 container position="relative" mb={2}>
              <Grid2 size={12}>
                <Typography
                  marginTop={2}
                  textAlign="center"
                  component="h1"
                  variant="h4"
                >
                  <Box sx={{ color: "primary.main" }} mb={0}>
                    <AssignmentIndIcon fontSize="large" />
                  </Box>
                  خوش آمدید
                </Typography>
                <Typography textAlign="center" component="h2" variant="h6">
                  اطلاعات کاربری خود را وارد کنید
                </Typography>
              </Grid2>
              <Grid2
                size={12}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  marginTop: "25px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormControl>
                  <FormLabel htmlFor="user">نام کاربری</FormLabel>
                  <TextField
                    name="user"
                    size="small"
                    fullWidth
                    id="user"
                    placeholder="کد ملی خود را وارد نمایید."
                    autoFocus
                    error={userError}
                    helperText={userErrorMessage}
                    variant="outlined"
                    color={userError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">کلمه عبور</FormLabel>
                  <TextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    size="small"
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    color={passwordError ? "error" : "primary"}
                  />
                </FormControl>
                {loading ? (
                  <Stack sx={{ backgroundColor: "paper" }}>
                    <CircularProgress
                      sx={{ color: "primary.main", margin: "auto" }}
                    />
                  </Stack>
                ) : (
                  <Button type="submit" fullWidth variant="contained">
                    ورود
                  </Button>
                )}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate("/auth/forget-password")}
                  variant="body2"
                  underline="none"
                  sx={{ alignSelf: "center" }}
                >
                  رمز عبور خود را فراموش کردم!
                </Link>
              </Grid2>
              <Grid2 size={12}>
                <Divider>
                  <Typography padding={2} sx={{ color: "text.secondary" }}>
                    یا
                  </Typography>
                </Divider>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography sx={{ textAlign: "center" }} variant="body2">
                    حساب کاربری ندارم؟{" "}
                    <Button
                      to="/auth/sign-up"
                      component={RouterLink}
                      variant="h6"
                      sx={{
                        alignSelf: "center",
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      ثبت نام
                    </Button>
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        ) : (
          <Box variant="outlined" padding={4}>
            <Typography textAlign="center" component="h1" variant="h4">
              <Box sx={{ color: "primary.main" }} mb={0}>
                <CodeIcon fontSize="large" />
              </Box>
              احراز هویت
            </Typography>
            <Typography textAlign="center" component="h2" variant="h6">
              کد ارسال شده به تلفن همراه خود را وارد نمایید.
            </Typography>
            <Box
              mt={2}
              component="form"
              onSubmit={handleOtpSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="code">کد اعتبارسنجی</FormLabel>
                    <TextField
                      name="code"
                      size="small"
                      fullWidth
                      id="code"
                      placeholder="0000"
                      error={codeError}
                      helperText={codeErrorMessage}
                      color={codeError ? "error" : "primary"}
                    />
                  </FormControl>
                </Grid2>
              </Grid2>
              {loading ? (
                <Stack sx={{ backgroundColor: "paper" }}>
                  <CircularProgress
                    sx={{ color: "primary.main", margin: "auto" }}
                  />
                </Stack>
              ) : (
                <Button type="submit" fullWidth variant="contained">
                  تایید
                </Button>
              )}
            </Box>
            <Divider>
              <Typography padding={2} sx={{ color: "text.secondary" }}>
                یا
              </Typography>
            </Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography sx={{ textAlign: "center" }}>
                کد را دریافت نکرده اید؟{" "}
                <Button
                  onClick={() => setOtp(!otp)}
                  variant="h6"
                  sx={{
                    alignSelf: "center",
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  درخواست کد
                </Button>
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
