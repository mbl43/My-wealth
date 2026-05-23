import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  CircleUser,
  Calculator,
  ChevronLeft,
  ChevronRight,
  LineChart,
  FileBarChart,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../contextAPI";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user: contextUser } = useUser();

  // Resolve user safely, fallback to Guest User
  const user = contextUser || {
    email: "guest@example.com",
    displayName: "Guest User",
  };

  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth <= 768;
      if (mobile) {
        setIsExpanded(false);
        setIsMobileOpen(false);
      } else {
        setIsExpanded(true);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const menuItems = useMemo(
    () => [
      { name: "Dashboard", path: "/", icon: Home },
      { name: "SIP Calculator", path: "/sip", icon: Calculator },
      { name: "Loss Recovery", path: "/loss", icon: LineChart },
      { name: "Stock Average", path: "/stockaverage", icon: FileBarChart },
      { name: "Profile", path: "/profile", icon: CircleUser },
    ],
    []
  );

  const SidebarContent = ({ mobile = false }) => (
    <nav className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-surface-700/30">
        {(isExpanded || mobile) && (
          <span className="text-lg font-bold text-gradient">My Wealth</span>
        )}
        {mobile ? (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-all hidden md:flex"
          >
            {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
      </div>

      {/* Nav Items */}
      <ul className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path}>
              <NavLink
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-surface-400 hover:text-surface-200 hover:bg-white/5"
                }`}
                title={!isExpanded && !mobile ? name : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-400 rounded-r-full"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Icon size={18} className="flex-shrink-0" />
                {(isExpanded || mobile) && <span>{name}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* User Profile */}
      <div className="border-t border-surface-700/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">
              {user.displayName?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          {(isExpanded || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.displayName}
              </p>
              <p className="text-xs text-surface-500 truncate">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden md:block h-[calc(100vh-64px)] sticky top-16 transition-all duration-300 ease-in-out
          bg-surface-900/60 backdrop-blur-sm border-r border-surface-800/50
          ${isExpanded ? "w-56" : "w-16"}`}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Toggle Button ── */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-6 left-6 z-40 w-12 h-12 rounded-2xl bg-emerald-500 text-white shadow-glow-emerald flex items-center justify-center hover:bg-emerald-400 transition-all"
      >
        <Home size={20} />
      </button>

      {/* ── Mobile Overlay Sidebar ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 z-50 bg-surface-900 border-r border-surface-800/50"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
