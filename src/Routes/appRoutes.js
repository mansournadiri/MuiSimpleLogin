import { Routes, Route, ScrollRestoration } from "react-router-dom";
import { Home, StartPage } from "../Pages";
import { Layout } from "../Pages/Layout/Layout";
import { SignIn, SignUp, ForgetPassword } from "../Pages/Auth";

import { notFound404 as NotFound404 } from "../Pages/error/notFound404";
import { AuthProvider } from "../context/AuthProvider";
import { PersistLogin, RequireAuth } from "../Components";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<StartPage />}>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/forget" element={<ForgetPassword />} />
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth allowedRoles={process.env.REACT_APP_VALID_ROLE} />
              }
            >
              <Route element={<Layout />}>
                <Route path="/" element={<Home />}></Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <ScrollRestoration />
    </AuthProvider>
  );
};
