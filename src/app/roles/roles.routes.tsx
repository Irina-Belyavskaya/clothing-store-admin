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
const RolesPage = React.lazy(() => import("app/roles/admin-role.page"));

const RolesRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={RolesPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RolesRoutes;