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
              <h1>Login</h1>
            </>
          }
        />
        <Route
          path="signUp"
          element={
            <>
              <h1>SignUp</h1>
            </>
          }
        />
        <Route
          path="dashboard"
          element={
            <>
              <h1>Dashboard</h1>
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
