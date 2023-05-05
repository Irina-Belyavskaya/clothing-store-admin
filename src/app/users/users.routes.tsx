import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const UserPage = React.lazy(() => import("app/users"));
const MainPage = React.lazy(() => import("app/users/admin-user.page"));

const UsersRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/admin/users/*"} element={<Suspended element={UserPage} />} />
      <Route path={"/"} element={<Suspended element={MainPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UsersRoutes;