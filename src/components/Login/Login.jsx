import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../index";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";

import { useUser } from "../../contextAPI";
import { useEffect } from "react";

const Login = () => {
  const { user, updateUser } = useUser();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const loggedUser = userCredential.user;
      updateUser({
        uid: loggedUser.uid,
        email: loggedUser.email,
        displayName: loggedUser.displayName,
      });
      localStorage.setItem("token", loggedUser.accessToken);
      toast.success(`Login Successful ${loggedUser.displayName || "User"}`);
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credential");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} />
      <div className="flex-1 flex">
        {/* ── Left Panel — Branding ── */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-surface-950 to-cyan-900/20" />
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-md px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white leading-tight">
                Welcome back to your{" "}
                <span className="text-gradient">wealth dashboard</span>
              </h2>
              <p className="mt-4 text-surface-400 leading-relaxed">
                Access your investments, track your portfolio, and keep your
                family's financial future secure.
              </p>
              <div className="mt-10 space-y-4">
                {[
                  "Real-time investment tracking",
                  "Nominee alert system",
                  "Financial calculators",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-surface-300">{item}</span>
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
              <h1 className="text-2xl font-bold text-white">Sign in</h1>
              <p className="mt-2 text-sm text-surface-400">
                Access your wealth dashboard
              </p>
            </div>

            <form onSubmit={handlesubmit} className="space-y-5">
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
                    onChange={(e) => setemail(e.target.value)}
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
                  >
                    {showPassword ? (
                      <HiEyeOff className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
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
                  "Sign in"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-surface-400">
              Don't have an account?{" "}
              <Link
                to="/auth"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
