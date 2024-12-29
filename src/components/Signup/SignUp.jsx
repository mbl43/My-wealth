import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../index";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Use updateProfile with the user object
      await updateProfile(user, {
        displayName: name,
      });

      console.log(userCredential);

      // Store user info in localStorage
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(
        `Account created Successfully! Welcome ${user.displayName}`
      );
      navigate("/");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handlesubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Name"
          onChange={(e) => setname(e.target.value)}
          value={name}
        />
        <input
          type="email"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Signup
        </button>
        <div className="flex min-w-fit gap-x-2">
          <h3 className="">Already have an account?</h3>
          <Link to="/login" className="text-blue-500 underline font-bold">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
