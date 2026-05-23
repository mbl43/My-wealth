import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import { useUser } from "../../contextAPI";

const Navbar = ({ user: propUser }) => {
  const { user: contextUser } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Resolve user from prop or context safely
  const user = propUser && typeof propUser === "object" && "user" in propUser
    ? propUser.user
    : propUser !== undefined
      ? propUser
      : contextUser;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMobile(!isMobile);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error("Logout failed:", error);
    }
  };

  const navLinks = ["Home","Contact"];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 bg-gradient-to-t from-surface-850  via-surface-950 to-navy-950 ${
        scrolled
          ? "backdrop-blur-xl border-b border-surface-800/50 shadow-lg"
          : "backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-glow-emerald group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              My <span className="text-gradient">Wealth</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((text) => (
              <li key={text}>
                <NavLink
                  to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-button text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-surface-300 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right Side Actions ── */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Logged-in state */
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-800/60 border border-surface-700/50">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-sm text-surface-300 font-medium">
                    {user?.displayName?.split(" ")[0] || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-button text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  title="Logout"
                >
                  <IoLogOutOutline size={20} />
                </button>
              </div>
            ) : (
              /* Logged-out state */
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="btn-ghost text-sm">
                  Login
                </Link>
                <Link to="/auth" className="btn-primary text-sm !py-2 !px-5">
                  Get Started
                </Link>
              </div>
            )}

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-button text-surface-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {isMobile ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-surface-800/50 bg-surface-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="section-container py-4 space-y-1">
              {navLinks.map((text) => (
                <NavLink
                  key={text}
                  to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                  onClick={() => setIsMobile(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-button text-sm font-medium transition-all ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-surface-300 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {text}
                </NavLink>
              ))}

              {!user && (
                <div className="pt-3 border-t border-surface-800/50 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobile(false)}
                    className="block text-center px-4 py-3 rounded-button text-sm font-medium text-surface-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setIsMobile(false)}
                    className="block text-center btn-primary text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
