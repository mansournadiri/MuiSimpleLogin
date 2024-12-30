import axios from "./useAxios";
import useAuth from "../context/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const localJwtToken = localStorage.getItem("jwtToken");
  const refresh = async () => {
    try {
      const apiUrl = process.env.REACT_APP_RefreshToken_API_URL;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localJwtToken}`,
        },
      });
      if (response.data?.succeeded) {
        const user = response?.data?.data?.data;
        const jwtToken = response?.data?.data.jwtToken;
        const roles = response?.data?.data.roles;
        setAuth((prev) => {
          return {
            ...prev,
            user: user,
            jwtToken: jwtToken,
            roles: roles,
          };
        });
      }
    } catch (err) {
      if (err?.status === 401) {
        localStorage.clear();
        console.log("Unautorize JWT Token");
      }
    }
    return true;
  };
  return refresh;
};
export default useRefreshToken;
