import * as React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  Divider,
  FormLabel,
  ThemeProvider,
  Grid2,
  Stack,
  CircularProgress,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { myTheme } from "../../shared-theme/myTheme";
import axios from "../../api/useAxios";
import { muiModal as MessageModal } from "../../Hooks/useModal";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = React.useState(true);
  const [errorTitle, setErrorTitle] = React.useState("");
  const [errorBody, setErrorBody] = React.useState("");

  const [nationalIdError, setNationalIdError] = React.useState(false);
  const [mobileError, setMobileError] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);

  const [nationalIdErrorMessage, setNationalIdErrorMessage] =
    React.useState("");
  const [mobileErrorMessage, setMobileErrorMessage] = React.useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    React.useState("");

  const nationalId_Regex = /^[0-9]{10}/;
  const pwd_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$$%]).{8,24}$/;
  const mobile_Regex = /^(?=.*[0][9])(?=.*[0-9]).{11}$/;

  const validateInputs = () => {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const nationalId = document.getElementById("nationalId");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const passwordConfirm = document.getElementById("passwordConfirm");

    let isValid = true;
    if (!mobile_Regex.test(mobileNumber.value)) {
      setMobileError(true);
      setMobileErrorMessage("تلفن همراه وارد شده اشتباه است.");
      isValid = false;
    } else {
      setMobileError(false);
      setMobileErrorMessage("");
    }
    console.log(firstName.value);
    if (firstName.value === null || firstName.value.length === 0) {
      setFirstNameError(true);
      setFirstNameErrorMessage("نام خود را وارد کنید.");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }
    if (lastName.value === null || lastName.value.length === 0) {
      setLastNameError(true);
      setLastNameErrorMessage("نام خانوادگی خود را وارد کنید.");
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage("");
    }
    if (!nationalId_Regex.test(nationalId.value)) {
      setNationalIdError(true);
      setNationalIdErrorMessage("کد ملی وارد شده اشتباه است.");
      isValid = false;
    } else {
      setNationalIdError(false);
      setNationalIdErrorMessage("");
    }
    if (!pwd_Regex.test(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "کلمه عبور ضعیف است، حداقل 8 کاراکتر و شامل حروف، اعداد و کاراکتر خاص باشد."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    if (password.value !== passwordConfirm.value) {
      setPasswordConfirmError(true);
      setPasswordConfirmErrorMessage("رمز عبور مطابقت ندارد.");
      isValid = false;
    } else {
      setPasswordConfirmError(false);
      setPasswordConfirmErrorMessage("");
    }
    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true);
    const data = new FormData(event.currentTarget);
    const apiUrl = process.env.REACT_APP_REGISTER_API_URL;
    try {
      const result = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (result.data.succeeded) {
        navigate("/auth/sign-in");
      } else {
        setLoading(false);
        setError(true);
        setErrorTitle("خطا!");
        setErrorBody(result.data?.message);
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
        <Box variant="outlined" padding={4}>
          <Grid2 container position="relative" mb={2}>
            <Grid2 size={12}>
              <MessageModal
                isOpen={open}
                onClose={handleClose}
                title={errorTitle}
                body={errorBody}
                isError={error}
              ></MessageModal>
            </Grid2>
            <Grid2 size={12}>
              <Typography
                marginTop={2}
                textAlign="center"
                component="h1"
                variant="h4"
              >
                <Box sx={{ color: "primary.main" }} mb={0}>
                  <HowToRegIcon fontSize="large" />
                </Box>
                ثبت نام
              </Typography>
              <Typography textAlign="center" component="h2" variant="h6">
                به جمع کاربران ما بپیوندید
              </Typography>
            </Grid2>
            <Grid2
              marginTop={2}
              container
              component="form"
              onSubmit={handleSubmit}
              spacing={2}
            >
              <Grid2 size={12}>
                <FormLabel htmlFor="nationalId">کدملی</FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  id="nationalId"
                  name="nationalId"
                  variant="outlined"
                  error={nationalIdError}
                  helperText={nationalIdErrorMessage}
                  color={nationalIdError ? "error" : "primary"}
                />
              </Grid2>
              <Grid2 size={12}>
                <FormLabel htmlFor="mobile">تلفن همراه</FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  id="mobileNumber"
                  placeholder="09"
                  name="mobileNumber"
                  variant="outlined"
                  error={mobileError}
                  helperText={mobileErrorMessage}
                  color={mobileError ? "error" : "primary"}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormLabel htmlFor="firstName">نام</FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  id="firstName"
                  name="firstName"
                  variant="outlined"
                  error={firstNameError}
                  helperText={firstNameErrorMessage}
                  color={firstNameError ? "error" : "primary"}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormLabel htmlFor="lastName">نام خانوادگی</FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  id="lastName"
                  name="lastName"
                  variant="outlined"
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  color={lastNameError ? "error" : "primary"}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormLabel htmlFor="password">کلمه عبور</FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormLabel htmlFor="passwordConfirm">تکرار کلمه عبور</FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  name="passwordConfirm"
                  placeholder="••••••"
                  type="password"
                  id="passwordConfirm"
                  variant="outlined"
                  error={passwordConfirmError}
                  helperText={passwordConfirmErrorMessage}
                  color={passwordConfirmError ? "error" : "primary"}
                />
              </Grid2>
              <Grid2 size={12}>
                {loading ? (
                  <Stack sx={{ backgroundColor: "paper" }}>
                    <CircularProgress
                      sx={{ color: "primary.main", margin: "auto" }}
                    />
                  </Stack>
                ) : (
                  <Button type="submit" fullWidth variant="contained">
                    ثبت نام
                  </Button>
                )}
              </Grid2>
            </Grid2>
            <Grid2 size={12}>
              <Divider>
                <Typography padding={2} sx={{ color: "text.secondary" }}>
                  یا
                </Typography>
              </Divider>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography sx={{ textAlign: "center" }}>
                  حساب کاربری دارید؟{" "}
                  <Button
                    component={RouterLink}
                    to="/auth/sign-in/"
                    variant="h6"
                    sx={{
                      alignSelf: "center",
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    وارد شوید
                  </Button>
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
