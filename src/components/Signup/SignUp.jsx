import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../index";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useUser } from "../../contextAPI";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiEye, HiEyeOff } from "react-icons/hi";

const SignUp = () => {
  const { user, updateUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Update Firebase profile with name
      await updateProfile(newUser, { displayName: name });

      // Update context and storage immediately to avoid race condition
      updateUser({
        uid: newUser.uid,
        email: newUser.email,
        displayName: name,
      });
      localStorage.setItem("token", newUser.accessToken);

      toast.success(`Account created successfully! Welcome, ${name}`);

      // Send a welcome email
      await sendWelcomeEmail(name, email);

      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Password strength
  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: "", color: "" };
    if (password.length < 6) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (password.length < 10) return { level: 2, label: "Fair", color: "bg-amber-500" };
    return { level: 3, label: "Strong", color: "bg-emerald-500" };
  };
  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} />
      <div className="flex-1 flex">
        {/* ── Left Panel — Branding ── */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-surface-950 to-emerald-900/30" />
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-emerald-500/8 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-md px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
                          <h2 className="text-3xl font-bold text-white leading-tight">
                Start protecting your{" "}
                <span className="text-gradient">family's wealth</span> today
              </h2>
              <p className="mt-4 text-surface-400 leading-relaxed">
                Join thousands of families who track, manage, and safeguard
                their financial assets in one secure place.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { num: "6+", label: "Asset Types" },
                  { num: "100%", label: "Free Forever" },
                  { num: "5+", label: "Families" },
                  { num: "256-bit", label: "Encryption" },
                ].map((stat, i) => (
                  <div key={i} className="card-premium p-3 text-center">
                    <div className="text-lg font-bold text-gradient">{stat.num}</div>
                    <div className="text-xs text-surface-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Right Panel — Form ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-white">Create account</h1>
              <p className="mt-2 text-sm text-surface-400">
                Free forever. No credit card required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                  <input
                    type="text"
                    className="input-field pl-11"
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                  <input
                    type="email"
                    className="input-field pl-11"
                    placeholder="you@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-field pl-11 pr-11"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
                  >
                    {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Strength indicator */}
                {password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i <= strength.level ? strength.color : "bg-surface-800"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-surface-500">{strength.label}</span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            
            <p className="mt-8 text-center text-sm text-surface-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
