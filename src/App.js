import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
//
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import Board from "./pages/board";

import Login from "./pages/login";

import SignUp from "./pages/signUp";

import Dashboard from "./pages/dashboard";

import Home from "./pages/home";
import { useState } from "react";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route
          path="login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="register"
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route path="dashboard">
          <Route index element={<Dashboard />}></Route>
          <Route path=":board_name" element={<Board />}></Route>
        </Route>
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
