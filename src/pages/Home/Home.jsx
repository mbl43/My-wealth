import React from "react";
import { Dashboard, Hero } from "../../components";
const Home = () => {
  const token = localStorage.getItem("token");
  return token ? <Dashboard/> : <Hero />;
};

export default Home;