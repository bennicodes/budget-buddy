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
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route index element={<Home />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Route>
  )
);
