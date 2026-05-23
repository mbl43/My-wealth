import React from "react";
import { Dashboard, Hero } from "../../components";
import { useUser } from "../../contextAPI";

const Home = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-surface-700 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-sm text-surface-500">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Hero />;
};

export default Home;