import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import Login from "./pages/login";

import SignUp from "./pages/signUp";

import Dashboard from "./pages/dashboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="Home"
          index
          element={
            <>
              <h1>Inicio</h1>
            </>
          }
        />
        <Route
          path="login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="signUp"
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route
          path="dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
