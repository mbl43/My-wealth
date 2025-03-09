import React from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "../../contextAPI";
import Sidebar from "../Sidebar/Sidebar";

const LossRecovery = () => {
    const user=useUser()
return(
    <>
    <Navbar user={user}/>
    <div className="flex flex-1">
      <Sidebar/>
      Loss Recovery calculator
    </div>
    </>
)
};

export default LossRecovery;
