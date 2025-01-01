import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Home, CircleUser, ChartLine, CreditCard, Calculator,
  ChevronLeft, ChevronRight, LineChart, FileBarChart
} from "lucide-react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState("87vh");

  const user = JSON.parse(localStorage.getItem("user")) || {
    email: "guest@example.com",
    displayName: "Guest User",
    avatar: "/api/placeholder/40/40"
  };

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth <= 768 ? `${window.innerHeight}px` : "87vh");
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Add Investment Flow", path: "/invest", icon: ChartLine },
    { name: "SIP Calculator", path: "/sip", icon: Calculator },
    { name: "Loss Recovery", path: "/loss", icon: LineChart },
    { name: "EMI Repayment", path: "/emi", icon: CreditCard },
    { name: "Stock Average", path: "/average", icon: FileBarChart },
    { name: "Profile", path: "/profile", icon: CircleUser }
  ];

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      <aside className={`h-[87vh] transition-all duration-300 ease-in-out bg-gradient-to-b from-indigo-900 via-blue-900 to-blue-950
        ${isExpanded ? "w-64" : "w-20"} shadow-2xl rounded-r-2xl`}>
        <nav className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-blue-700/50 backdrop-blur-sm bg-blue-900/20">
            {isExpanded && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-200 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
                My Wealth
              </h1>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-blue-800/50 text-emerald-200 transition-all duration-200 hover:scale-105"
            >
              {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          </div>

          <ul className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
            {menuItems.map(({ name, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? "bg-gradient-to-r from-blue-800/80 to-blue-900/80 text-emerald-300 shadow-lg" 
                      : "text-blue-100 hover:bg-blue-800/40 hover:text-emerald-200 hover:translate-x-1"
                    }
                  `}
                >
                  <Icon size={20} className="flex-shrink-0" strokeWidth={2} />
                  {isExpanded && (
                    <span className="ml-3 font-medium text-sm tracking-wide">{name}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="border-t border-blue-700/50 p-4 backdrop-blur-sm bg-blue-900/20">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full ring-2 ring-emerald-300/50 transition-all duration-200 group-hover:ring-emerald-300"
                />
              </div>
              {isExpanded && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                  <p className="text-xs text-blue-200 truncate">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}