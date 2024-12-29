import React from "react";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Navbar user={user} />
      Dashboard
    </>
  );
};

export default Dashboard;
