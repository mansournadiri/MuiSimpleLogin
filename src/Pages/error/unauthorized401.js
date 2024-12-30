import { useNavigate as UseNavigate } from "react-router-dom";
import NotFoundImg from "../../assets/Image/404.svg";
import { useTitle as UseTitle } from "../../Hooks/useTitle";

export const unauthorized401 = () => {
  const navigate = UseNavigate();
  const goBack = () => navigate(-1);
  UseTitle("خطای 401 - عدم مجوز دسترسی");
  return (
    <img
      src={NotFoundImg}
      className="rounded"
      alt="PageNotFound"
      onClick={goBack}
    />
  );
};
export default unauthorized401;
