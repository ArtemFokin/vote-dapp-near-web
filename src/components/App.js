import React from "react";
import "./App.less";
import Login from "./Login/Login";
import AppLayout from "./AppLayout/AppLayout";
import HomePage from "./HomePage/HomePage";
import RequireAuth from "./RequireAuth/RequireAuth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import NewPoolConnected from "./NewPool/NewPoolConnected";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/new-pool" element={<NewPoolConnected />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
