import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./auth/Login";
import RegisterPage from "./auth/Register";
import EmployeeDashboard from "./pages/employees/EmployeeDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerLeaveRequests from "./pages/manager/ManagerLeaveRequests";
import ManagerShiftSchedule from "./pages/manager/ManagerShiftSchedule";
import ManagerProfile from "./pages/manager/ManagerProfile";
import ManagerCareer from "./pages/manager/ManagerCareer";
import HRMainDashboard from "./pages/hr/HRMainDashboard";
import CreatePost from "./pages/hr/CreatePost";
import LeaveForm from "./pages/hr/LeaveForm";
import SickLeaveForm from "./pages/hr/SickLeaveForm";
import HrAnnouncements from "./pages/hr/HrAnnouncements";
import HrCareer from "./pages/hr/HrCareer";
import HrProfile from "./pages/hr/HrProfile";
import HrRecruitment from "./pages/hr/HrRecruitment";
import HrReporting from "./pages/hr/HrReporting";
import HrTraining from "./pages/hr/HrTraining";
import CreateUser from "./pages/hr/CreateUser";
import AssignTraining from "./pages/hr/AssignTraining";
import EmployeeList from "./pages/hr/EmployeeList";
import Logout from "./auth/Logout";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<Logout />} />

          {/* Employee Routes */}
          <Route path="/employees/dashboard" element={<EmployeeDashboard />} />

          {/* Manager Routes */}
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route
            path="/manager/leave-requests"
            element={<ManagerLeaveRequests />}
          />
          <Route
            path="/manager/shift-schedule"
            element={<ManagerShiftSchedule />}
          />
          <Route path="/manager/profile" element={<ManagerProfile />} />
          <Route path="/manager/career" element={<ManagerCareer />} />

          {/* HR Routes */}
          <Route path="/hr/HRMainDashboard" element={<HRMainDashboard />} />
          <Route
            path="/hr/HRMainDashboard/createpost"
            element={<CreatePost />}
          />
          <Route path="/hr/HRMainDashboard/leaveform" element={<LeaveForm />} />
          <Route
            path="/hr/HRMainDashboard/sickleaveform"
            element={<SickLeaveForm />}
          />
          <Route
            path="/hr/HRMainDashboard/announcements"
            element={<HrAnnouncements />}
          />
          <Route
            path="/hr/HRMainDashboard/reporting"
            element={<HrReporting />}
          />
          <Route
            path="/hr/HRMainDashboard/recruitment"
            element={<HrRecruitment />}
          />
          <Route
            path="/hr/HRMainDashboard/hrtraining"
            element={<HrTraining />}
          />
          <Route path="/hr/HRMainDashboard/career" element={<HrCareer />} />
          <Route path="/hr/HRMainDashboard/profile" element={<HrProfile />} />
          <Route
            path="/hr/HRMainDashboard/createuser"
            element={<CreateUser />}
          />
          <Route
            path="/hr/HRMainDashboard/assigntraining"
            element={<AssignTraining />}
          />
          <Route
            path="/hr/HRMainDashboard/employeelist"
            element={<EmployeeList />}
          />

          {/* 404 Route */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
