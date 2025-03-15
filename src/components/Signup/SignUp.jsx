import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../index";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useUser } from "../../contextAPI";

const SignUp = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Send a welcome email
  const sendWelcomeEmail = async (userName, userEmail) => {
    const templateParams = {
      user_name: userName,
      user_email: userEmail,
    };

    try {
      await emailjs.send(
        "service_k34f7tp", // EmailJS service ID
        "template_g975m0f", // EmailJS template ID
        templateParams,
        "DEVywm1c0-ncWm9fi" // Public key
      );
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send welcome email.");
    }
  };

  // Handle signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Update Firebase profile with name
      await updateProfile(newUser, { displayName: name });

      // Store user info in localStorage
      const updatedUser = { ...newUser, displayName: name };
      localStorage.setItem("token", newUser.accessToken);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(`Account created successfully! Welcome, ${name}`);

      // Send a welcome email
      await sendWelcomeEmail(name, email);

      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar user={user} />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          type="email"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Signup
        </button>
        <div className="flex min-w-fit gap-x-2">
          <h3>Already have an account?</h3>
          <Link to="/login" className="text-blue-500 underline font-bold">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
