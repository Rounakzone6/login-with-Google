import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import Dashboard from "./components/Dashboard";
import Error from "./components/PageNotFound";
import PageNotFound from "./components/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RefreshHandler from "./components/RefreshHandler";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="61377819112-enui4fe76i16k3ul2i8kvihib7a2tlov.apps.googleusercontent.com">
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    );
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
