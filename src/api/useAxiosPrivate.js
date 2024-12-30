import { axiosPrivate } from "./useAxios";
import useAuth from "../context/useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.jwtToken}`;
      }
      return config;
    },
    (error) => {
      console.log(error);
      Promise.reject(error);
    }
  );

  axiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        console.log("No Auturize");
      }
      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};

export default useAxiosPrivate;
