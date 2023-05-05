import Cookies from "js-cookie";
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return Cookies.get('access_token_admin') ? (
    <Suspense fallback={<div />}>
      <div><Element /></div>
    </Suspense>
  ) : (
    <Navigate to={"/app"} />
  );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />}>
    <Element />
  </Suspense>
);

// ======= pages ======= //
const AuthPage = React.lazy(() => import("app/auth"));
const AdminPage = React.lazy(() => import("app/admin"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/app/admin/*"} element={<PrivateRoute element={AdminPage} />} />
      <Route path={"/app/*"} element={<PublicRoute element={AuthPage} />} />
      
      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/app/admin" />} />
    </Routes>
  );
};

export default AppRoutes;