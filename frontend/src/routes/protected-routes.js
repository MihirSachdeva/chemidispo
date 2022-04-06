import React from "react";
import { Route, Routes } from "react-router-dom";
import { pages } from "../constants/frontend-urls";
import * as Components from "../pages";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route exact path={pages.HANDLING} element={<Components.Handling />} />
      <Route exact path={pages.DISPOSAL} element={<Components.Disposal />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default ProtectedRoutes;
