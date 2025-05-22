import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import elements
import App from "../App";
import RouteGuard from "../components/auth/RouteGuard";
import Contact from "../pages/Contact/Contact";
import Expenses from "../pages/Expenses/Expenses";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      {/* Protected routes */}
      <Route
        index
        element={
          <RouteGuard>
            <Home />
          </RouteGuard>
        }
      />
      <Route
        path="/expenses"
        element={
          <RouteGuard>
            <Expenses />
          </RouteGuard>
        }
      />
      <Route
        path="/contact"
        element={
          <RouteGuard>
            <Contact />
          </RouteGuard>
        }
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Route>
  )
);
