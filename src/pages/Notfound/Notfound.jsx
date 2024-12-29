import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Oops! Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist. It might have been removed
        or the URL might be incorrect.
      </p>
      <Link
        to="/"
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Notfound;
