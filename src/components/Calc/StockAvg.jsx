import React from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "../../contextAPI";
import Sidebar from "../Sidebar/Sidebar";

const StockAvg = () => {
  const user = useUser();
  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
      Stock price average calculator
      </div>
    </>
  );
};

export default StockAvg;
