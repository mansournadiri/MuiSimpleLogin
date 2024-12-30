import useAuth from "../context/useAuth";

const useSingOut = () => {
  const { setAuth } = useAuth();
  const signout = async () => {
    console.log("Close Your Session.");
    setAuth({});
    localStorage.clear();
  };
  return signout;
};

export default useSingOut;
