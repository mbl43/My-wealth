import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../index";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Login Successful ${user.displayName}`);
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credential");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };
  return (
    <>
      <Navbar />
      <form
        onSubmit={handlesubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <input
          type="email"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
          disabled={loading} // Disable input when loading
        />
        <input
          type="password"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          disabled={loading} // Disable input when loading
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mx-auto flex justify-center "
          disabled={loading} 
        >
          {loading ? (
            <div className="loader border-t-transparent border-4 border-white rounded-full w-6 h-6 animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
        <div className="flex min-w-fit gap-x-2">
          <h3 className="">Create account?</h3>
          <Link to="/auth" className="text-blue-500 underline font-bold">
            Signup
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
