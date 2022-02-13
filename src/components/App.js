import React from "react";
import "./App.less";
import Login from "./Login/Login";
import AppLayout from "./AppLayout/AppLayout";
import HomePage from "./HomePage/HomePage";
import RequireAuth from "./RequireAuth/RequireAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
