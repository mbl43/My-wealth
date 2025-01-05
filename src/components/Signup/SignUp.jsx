import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../index";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useUser } from "../../contextAPI";

const SignUp = () => {
  const {user}=useUser()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();

  // Send a welcome email
  const sendWelcomeEmail = async (userName, userEmail) => {
    const templateParams = {
      user_name: userName,
      user_email: userEmail,
    };

    try {
      const response = await emailjs.send(
        "service_k34f7tp", //  EmailJS service ID
        "template_g975m0f", //  EmailJS template ID
        templateParams,
        "DEVywm1c0-ncWm9fi" //  public key
      );
      console.log("Email sent successfully!", response.status, response.text);
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send welcome email.");
    }
  };

  // Handle signup
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with the display name
      await updateProfile(user, { displayName: name });

      // Store user info in localStorage
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Account created Successfully! Welcome ${user.displayName}`);

      // Send a welcome email
      await sendWelcomeEmail(user.displayName, user.email);

      navigate("/");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <Navbar user={user}/>
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
