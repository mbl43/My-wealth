import { Sidebar, Navbar, Modal, Dialog } from "../index";
import { useUser } from "../../contextAPI";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase/firebase";
import emailjs from "@emailjs/browser";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  limit,
} from "firebase/firestore";
import Loader from "../Loader/Loader";
import { Pencil, Trash2, TrendingUp, Users, FileBarChart, Send } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import Nominee from "../Modal/Nominee";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useUser();
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [investments, setInvestments] = useState([]);
  const [name, setName] = useState("Add Nominee Name");
  const [email, setEmail] = useState("Add Nominee Email ID");
  const [investmentCount, setInvestmentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized fetchInvestments function to prevent unnecessary re-creations
  const fetchInvestments = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!user?.uid) {
      console.log("User not logged in");
      setLoading(false);
      return;
    }

    try {
      let totalAmount = 0;
      let count = 0;
      // investment details
      const detailsCollectionRef = collection(
        db,
        "investments",
        user.uid,
        "details"
      );

      const detailsQuery = query(
        detailsCollectionRef,
        orderBy("timestamp", "desc")
      );
      const detailsSnapshot = await getDocs(detailsQuery);
      // Nominee details
      const nomineedtailsCollectionRef = collection(
        db,
        "investments",
        user.uid,
        "Nominee_details"
      );

      const nomineedetailsQuery = query(
        nomineedtailsCollectionRef,
        orderBy("updated_at", "desc"),
        limit(1)
      );
      const NomineeSnapshot = await getDocs(nomineedetailsQuery);

      NomineeSnapshot.forEach((doc) => {
        const Nomineedata = doc.data();
        setName(Nomineedata.Name_of_Nominee || "");
        setEmail(Nomineedata.Nominee_Email || "");
      });

      const investmentData = [];
      let initialInvestment = null;

      detailsSnapshot.forEach((doc) => {
        const data = doc.data();

        // Ensuring numeric values are properly parsed
        const stocksValue = parseFloat(data.stocks_value) || 0;
        const mutualFundValue = parseFloat(data.mutual_fund) || 0;
        const ppfValue = parseFloat(data.ppf_value) || 0;
        const fdValue = parseFloat(data.fd_value) || 0;
        const GoldValue = parseFloat(data.Gold) || 0;
        const SilverValue = parseFloat(data.Silver) || 0;

        const investmentValue =
          stocksValue +
          mutualFundValue +
          ppfValue +
          fdValue +
          GoldValue +
          SilverValue;
        let formattedDate = data.date;
        if (data.date) {
          formattedDate = data.date;
        }

        totalAmount += investmentValue;
        count++;

        if (!initialInvestment && data.name && data.email) {
          initialInvestment = data;
        }

        investmentData.push({
          id: doc.id,
          ...data,
          formattedDate,
          totalValue: investmentValue,
        });
      });

      setInvestments(investmentData);
      setTotalInvestment(totalAmount);
      setInvestmentCount(count);

      console.log("Total Investment:", totalAmount, "Total Count:", count);
    } catch (err) {
      console.error("Error fetching investments:", err.message);
      setError("Failed to load investments. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Delete Button
  const deleteInvestmentDetail = async (detailId) => {
    if (confirm("Press OK to delete record !!")) {
      try {
        const parentId = user?.uid;
        const docRef = doc(db, `investments/${parentId}/details/${detailId}`);
        await deleteDoc(docRef);
        fetchInvestments();
        console.log("Document deleted successfully!");
        toast.success("Investment detail deleted successfully!");
      } catch (error) {
        toast.error("Error deleting document:", error);
      }
    }
  };

  // Edit Button
  const editInvestmentDetail = async (editId) => {
    try {
      const parentId = user?.uid;
      const docRef = doc(db, `investments/${parentId}/details/${editId}`);
      await updateDoc(docRef, updatedData);
      toast.success("Investment detail updated successfully!");
      console.log("Investment detail updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  // Notification
  const sendNotification = async (email, name) => {
    if (!email || !name) {
      toast.error("Add Email and Name of Nominee!!");
      console.table("email", email);
    }
    const Totalinvestments = investments.reduce(
      (sum, inv) => ({
        Gold: Number(sum.Gold) + Number(inv.Gold || 0),
        Silver: Number(sum.Silver) + Number(inv.Silver || 0),
        ppf_value: Number(sum.ppf_value) + Number(inv.ppf_value || 0),
        fd_value: Number(sum.fd_value) + Number(inv.fd_value || 0),
        mutual_fund: Number(sum.mutual_fund) + Number(inv.mutual_fund || 0),
        stocks_value: Number(sum.stocks_value) + Number(inv.stocks_value || 0),
      }),
      {
        Gold: 0,
        Silver: 0,
        ppf_value: 0,
        fd_value: 0,
        mutual_fund: 0,
        stocks_value: 0,
      }
    );
    const templateParams = {
      nominator_name: user?.displayName,
      user_name: name,
      user_email: email,
      totalInvestment: totalInvestment.toLocaleString("en-IN"),
      gold: Totalinvestments.Gold.toLocaleString("en-IN"),
      silver: Totalinvestments.Silver.toLocaleString("en-IN"),
      ppf: Totalinvestments.ppf_value.toLocaleString("en-IN"),
      fd: Totalinvestments.fd_value.toLocaleString("en-IN"),
      mutual_fund: Totalinvestments.mutual_fund.toLocaleString("en-IN"),
      stocks_value: Totalinvestments.stocks_value.toLocaleString("en-IN"),
      transaction_date: new Date().toLocaleDateString("en-IN"),
    };

    try {
      await emailjs.send(
        "service_k34f7tp", // Service ID
        "template_sbl04nb", // Template ID
        templateParams,
        "DEVywm1c0-ncWm9fi" // Public Key
      );
      toast.success("Your Latest Investment Summary sent to Nominee!!");
      console.log("++", email);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [fetchInvestments]);

  // Aggregated chart data
  const aggregated = investments.reduce(
    (acc, inv) => ({
      stocks: acc.stocks + (parseFloat(inv.stocks_value) || 0),
      mf: acc.mf + (parseFloat(inv.mutual_fund) || 0),
      ppf: acc.ppf + (parseFloat(inv.ppf_value) || 0),
      fd: acc.fd + (parseFloat(inv.fd_value) || 0),
      gold: acc.gold + (parseFloat(inv.Gold) || 0),
      silver: acc.silver + (parseFloat(inv.Silver) || 0),
    }),
    { stocks: 0, mf: 0, ppf: 0, fd: 0, gold: 0, silver: 0 }
  );

  const chartData = {
    labels: ["Stocks", "Mutual Funds", "PPF", "Fixed Deposits", "Gold", "Silver"],
    datasets: [
      {
        data: [aggregated.stocks, aggregated.mf, aggregated.ppf, aggregated.fd, aggregated.gold, aggregated.silver],
        backgroundColor: [
          "#10b981",
          "#06b6d4",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
          "#64748b",
        ],
        borderColor: "transparent",
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#94a3b8",
          padding: 16,
          font: { size: 12, family: "Inter" },
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#94a3b8",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx) => ` ₹${ctx.raw?.toLocaleString("en-IN") || 0}`,
        },
      },
    },
  };

  const hasChartData = Object.values(aggregated).some((v) => v > 0);

  const categoryColors = {
    stocks_value: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Stocks" },
    mutual_fund: { bg: "bg-cyan-500/10", text: "text-cyan-400", label: "Mutual Funds" },
    ppf_value: { bg: "bg-violet-500/10", text: "text-violet-400", label: "PPF" },
    fd_value: { bg: "bg-amber-500/10", text: "text-amber-400", label: "FD" },
    Gold: { bg: "bg-red-500/10", text: "text-red-400", label: "Gold" },
    Silver: { bg: "bg-surface-500/10", text: "text-surface-400", label: "Silver" },
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Welcome back,{" "}
                <span className="text-gradient">
                  {user?.displayName || "User"}
                </span>
              </h1>
              <p className="text-sm text-surface-500 mt-1">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                id="sendemail"
                onClick={() => sendNotification(email, name)}
                className="btn-secondary text-sm !py-2 !px-4"
              >
                <Send size={16} />
                Notify Nominee
              </button>
              

              <Modal
                id="Addinvest"
                investmentCount={investmentCount}
                onSuccess={fetchInvestments}
               
              />
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="card-premium p-6 border-red-500/20">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* ── Stat Cards ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Total Investment */}
                <div className="stat-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-surface-400 mb-1">Total Investment</p>
                      <p className="text-2xl font-bold text-white">
                        ₹{totalInvestment.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <TrendingUp size={20} className="text-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Nominee */}
                <div className="stat-card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-surface-400">Nominee</p>
                        <Nominee />
                      </div>
                      <p className="text-lg font-semibold text-white truncate">{name}</p>
                      <p className="text-xs text-surface-500 truncate">{email}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Users size={20} className="text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Records Count */}
                <div className="stat-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-surface-400 mb-1">Investment Records</p>
                      <p className="text-2xl font-bold text-white">{investmentCount}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <FileBarChart size={20} className="text-violet-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Chart + History Row ── */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Chart */}
                {hasChartData && (
                  <div className="card-premium p-6 lg:col-span-1">
                    <h2 className="text-lg font-semibold text-white mb-4">
                      Wealth Distribution
                    </h2>
                    <div className="h-64">
                      <Doughnut data={chartData} options={chartOptions} />
                    </div>
                  </div>
                )}

                {/* Investment History */}
                <div className={`card-premium p-6 ${hasChartData ? "lg:col-span-2" : "lg:col-span-3"}`}>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Investment History
                  </h2>
                  {investments.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-2xl bg-surface-800/60 flex items-center justify-center mx-auto mb-4">
                        <FileBarChart size={28} className="text-surface-500" />
                      </div>
                      <p className="text-surface-400 mb-1">No investments yet</p>
                      <p className="text-sm text-surface-500">
                        Click "Add Investment" to get started.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {investments.map((inv, index) => (
                        <motion.div
                          key={inv.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.04 }}
                          className="bg-surface-800/40 border border-surface-700/30 rounded-xl p-4 hover:border-surface-600/50 transition-all group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-surface-300">
                                {inv.formattedDate}
                              </span>
                              <span className="badge-emerald text-xs">
                                ₹{inv.totalValue.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => editInvestmentDetail(inv.id)}
                                className="p-1.5 rounded-lg text-surface-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => deleteInvestmentDetail(inv.id)}
                                className="p-1.5 rounded-lg text-surface-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {Object.entries(categoryColors).map(([key, style]) => {
                              const val = parseFloat(inv[key]) || 0;
                              if (val <= 0) return null;
                              return (
                                <span
                                  key={key}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${style.bg} ${style.text}`}
                                >
                                  {style.label}: ₹{val.toLocaleString("en-IN")}
                                </span>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {user && <Dialog uid={user.uid} />}
    </div>
  );
};

export default Dashboard;
