import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Application from "./pages/Application";
import Addjob from "./pages/Addjob";
import ChartPanel from "./pages/Chart";
import StatsPanel from "./pages/Countup";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/application" element={<Application />} />
      <Route path="/add-job" element={<Addjob />} />
      <Route path="/chart" element={<ChartPanel />} />
      <Route path="/countup" element={<StatsPanel />} />
    </Route>
  )
);