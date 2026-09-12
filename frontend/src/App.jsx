import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Reels from "./pages/Reels";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ManagerDashboard from "./pages/ManagerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Food Reels */}
        <Route
          path="/reels/:category"
          element={<Reels />}
        />

        {/* Login */}
        <Route
          path="/user-login"
          element={<Login role="user" />}
        />

        <Route
          path="/manager-login"
          element={<Login role="manager" />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* User Protected Route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute role="user">
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Manager Protected Route */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}