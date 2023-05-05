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
const ProductsPage = React.lazy(() => import("app/products/admin-products.page"));

const ProductsRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={ProductsPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ProductsRoutes;