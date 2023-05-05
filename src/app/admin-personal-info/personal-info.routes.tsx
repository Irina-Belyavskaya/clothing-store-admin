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
const SettingsPage = React.lazy(() => import("app/admin-personal-info/admin-personal-info.page"));

const PersonalInfoRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={SettingsPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PersonalInfoRoutes;