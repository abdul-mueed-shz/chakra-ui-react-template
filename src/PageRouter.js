import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // HelmetProvider for metadata
import Layout from "@layout/main";
import AuthGuard from "@components/auth/guard";
import NotFound from "@components/error/not-found";
import { MAIN_ROUTES } from "@utils/routes";
import { AUTH_ROUTES } from "./utils/routes";

function PageRouter() {
  return (
    <HelmetProvider>
      <Routes>
        {Object.values(AUTH_ROUTES).map(
          ({ PATH, COMPONENT: Component, META, TITLE }) => (
            <Route
              key={PATH}
              path={PATH}
              element={
                <>
                  <Helmet>
                    <title>{TITLE}</title>
                    {META}
                  </Helmet>
                  <Component />
                </>
              }
            />
          )
        )}

        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            {Object.values(MAIN_ROUTES).map(
              ({ PATH, COMPONENT: Component, META, TITLE }) => (
                <Route
                  key={PATH}
                  path={PATH}
                  element={
                    <>
                      <Helmet>
                        <title>{TITLE}</title>
                        {META}
                      </Helmet>
                      <Component />
                    </>
                  }
                />
              )
            )}
          </Route>
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <>
              <Helmet>
                <title>404 - Page Not Found</title>
                <meta
                  name="description"
                  content="Oops! The page you're looking for doesn't exist."
                />
              </Helmet>
              <NotFound />
            </>
          }
        />
      </Routes>
    </HelmetProvider>
  );
}

export default PageRouter;
