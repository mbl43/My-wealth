import React from "react";
import { Sidebar, Navbar } from "../index";

const Dashboard = () => {
  // Retrieve user data from localStorage with a fallback
  const user = JSON.parse(localStorage.getItem("user")) || { displayName: "Guest", email: "guest@example.com" };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Sidebar below Navbar */}
      <div className="flex flex-1">
        <Sidebar />
        
        {/* Main Dashboard Content */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {/* Greeting */}
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome back, <span className="font-bold text-[#4afc70]">{user.displayName}!</span>
          </h1>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
