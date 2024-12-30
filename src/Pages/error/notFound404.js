import { useNavigate as UseNavigate } from "react-router-dom";
import NotFoundImg from "../../assets/Image/404.svg";
import { useTitle as UseTitle } from "../../Hooks/useTitle";
import { Button, Box, Grid2 } from "@mui/material";

export const notFound404 = () => {
  const navigate = UseNavigate();
  const goBack = () => navigate(-1);
  UseTitle("خطای 404 - صفحه یافت نشد");
  return (
    <Grid2 size={12}>
      <img
        src={NotFoundImg}
        className="rounded"
        alt="PageNotFound"
        onClick={goBack}
      />
      <Box component="div" textAlign="center">
        <Button type="button" variant="contained" onClick={goBack}>
          بازگشت
        </Button>
      </Box>
    </Grid2>
  );
};
export default notFound404;
