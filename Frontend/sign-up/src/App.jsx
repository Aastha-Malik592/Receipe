import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./c/ProtectedRoute";
import './App.css'

const App = () => {
  return (
    <Routes>
   
 <Route path="/" element={<Signup />} />

  <Route path="/login" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
</Routes>
  );
};

export default App;