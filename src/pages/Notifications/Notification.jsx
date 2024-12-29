import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/index";

const Notification = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <>
  <Navbar user={user}/>
  {user && 
  <div className="">Zero notification
 
  </div>
  }</>;
};

export default Notification;
