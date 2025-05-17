import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import elements
import App from "../App";
import AuthRedirect from "../components/auth/AuthRedirect";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Transactions from "../pages/Transactions/Transactions";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Auth routes */}
      <Route
        path="/sign-in"
        element={
          <AuthRedirect>
            <SignIn />
          </AuthRedirect>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthRedirect>
            <SignUp />
          </AuthRedirect>
        }
      />
      {/* Public routes */}
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Protected routes */}
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Route>
  )
);
