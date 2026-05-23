import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar, Sidebar } from "../index";
import { useUser } from "../../contextAPI";
import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        {user && (
          <div className="flex-1 p-4 md:p-8 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg"
            >
              <div className="card-premium p-8 text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto ring-4 ring-emerald-500/20">
                  <span className="text-white text-3xl font-bold">
                    {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-bold text-white">
                  {user.displayName || "User"}
                </h2>

                {/* Info Cards */}
                <div className="mt-8 space-y-3 text-left">
                  <div className="flex items-center gap-4 p-4 bg-surface-800/40 border border-surface-700/30 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-surface-500">Email</p>
                      <p className="text-sm font-medium text-surface-200 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-surface-800/40 border border-surface-700/30 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-surface-500">Display Name</p>
                      <p className="text-sm font-medium text-surface-200 truncate">{user.displayName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
