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
const ProductsPage = React.lazy(() => import("app/products"));
const PersonalInfo = React.lazy(() => import("app/admin-personal-info"));
const RolesPage = React.lazy(() => import("app/roles"));
const CategoriesPage = React.lazy(() => import("app/categories"));
const UserPage = React.lazy(() => import("app/users/admin-user.page"));
const SettingsPage = React.lazy(() => import('app/settings/admin-settings.page'));

const AdminRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/personal-info/*"} element={<Suspended element={PersonalInfo} />} />
      <Route path={"/categories/*"} element={<Suspended element={CategoriesPage} />} />
      <Route path={"/products/*"} element={<Suspended element={ProductsPage} />} />
      <Route path={"/roles/*"} element={<Suspended element={RolesPage} />} />
      <Route path={"/users/*"} element={<Suspended element={UserPage} />} />
      <Route path={"/"} element={<Suspended element={UserPage} />} />
      <Route path={"/settings/*"} element={<Suspended element={SettingsPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AdminRoutes;