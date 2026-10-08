import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dahboard";
import Leads from "./pages/leads/Leads";
import CreateLead from "./pages/leads/CreateLead";
import LeadDetails from "./pages/leads/LeadDetails";
import EditLead from "./pages/leads/EditLead";
import Users from "./pages/users/Users";
import CreateUser from "./pages/users/CreateUser";
import UserDetails from "./pages/users/UserDetails";
import EditUser from "./pages/users/EditUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/create" element={<CreateLead />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/leads/:id/edit" element={<EditLead />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/edit" element={<EditUser />} />

          <Route path="*" element={<Navigate to="/login" replace/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;