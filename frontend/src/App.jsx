import { Box, Heading, Button } from '@chakra-ui/react';
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
