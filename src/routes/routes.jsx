import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import elements
import App from "../App";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Transactions from "../pages/Transactions/Transactions";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Route */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Protected Routes */}
      <Route index element={<Home />} />
      <Route path="/transactions" element={<Transactions />} />
    </Route>
  )
);
