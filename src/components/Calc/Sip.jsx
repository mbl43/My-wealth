import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "../Navbar/Navbar";
import { useUser } from "../../contextAPI";
import { Sidebar } from "../index";

ChartJS.register(ArcElement, Tooltip, Legend);

const Sip = () => {
  const { user } = useUser();
  const [monthly_invest, setmonthly_invest] = useState(5000);
  const [roi, setroi] = useState(12);
  const [time, settime] = useState(7);
  const [resulmonthly_invest, setresultmonthly_invest] = useState("");
  const [resultroi, setresultroi] = useState("");
  const [resulttime, setresulttime] = useState("");

  const calculate = (e) => {
    e.preventDefault();
    const monthly_invest1 = parseInt(monthly_invest);
    const time1 = parseInt(time);
    const roi1 = parseFloat(roi) / 100;
    if (monthly_invest1 <= 0 || time1 <= 0 || roi1 <= 0) {
      alert("Please don't enter negative or zero values.");
      return;
    }
    if (isNaN(monthly_invest1) || isNaN(time1) || isNaN(roi1)) {
      alert("Please enter valid numeric values.");
      return;
    }
    const n = 12;
    const p = time1 * 12;
    const monthly_int_rate = roi1 / n;
    const total_invest = monthly_invest1 * p;
    const total_return =
      monthly_invest1 *
      (((Math.pow(1 + monthly_int_rate, p) - 1) / monthly_int_rate) *
        (1 + monthly_int_rate));
    const wealth_gain = total_return - total_invest;
    setresultmonthly_invest(total_invest.toFixed(0));
    setresulttime(wealth_gain.toFixed(0));
    setresultroi(total_return.toFixed(0));
  };

  const data = {
    labels: ["Invested Amount", "Est. Returns"],
    datasets: [
      {
        label: "SIP Breakdown",
        data: [resulmonthly_invest, resulttime],
        backgroundColor: ["#10b981", "#06b6d4"],
        borderColor: "transparent",
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#94a3b8", font: { size: 12, family: "Inter" }, usePointStyle: true },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#94a3b8",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: { label: (ctx) => `${ctx.label}: ₹${Number(ctx.raw).toLocaleString("en-IN")}` },
      },
    },
  };

  const reset = (e) => {
    e.preventDefault();
    setmonthly_invest(5000);
    setroi(12);
    settime(7);
    setresultmonthly_invest("");
    setresulttime("");
    setresultroi("");
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculator */}
            <div className="card-premium p-6">
              <h2 className="text-xl font-bold text-white mb-6">SIP Calculator</h2>
              <form onSubmit={calculate} className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-surface-300">Monthly Investment</label>
                    <span className="text-sm font-semibold text-emerald-400">₹{Number(monthly_invest).toLocaleString()}</span>
                  </div>
                  <input type="range" value={monthly_invest} onChange={(e) => setmonthly_invest(e.target.value)} min={500} step={500} max={100000} required />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-surface-300">Rate of Interest</label>
                    <span className="text-sm font-semibold text-cyan-400">{roi}%</span>
                  </div>
                  <input type="range" value={roi} onChange={(e) => setroi(e.target.value)} min={1} max={30} step={0.5} required />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-surface-300">Time Period</label>
                    <span className="text-sm font-semibold text-violet-400">{time} yrs</span>
                  </div>
                  <input type="range" value={time} onChange={(e) => settime(e.target.value)} min={1} max={50} required />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">Calculate</button>
                  <button type="button" onClick={reset} className="btn-secondary flex-1">Reset</button>
                </div>
              </form>

              {/* Results */}
              {resulmonthly_invest && (
                <div className="mt-6 p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-surface-400">Total Investment</span>
                    <span className="text-sm font-semibold text-white">₹{Number(resulmonthly_invest).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-surface-400">Wealth Gain</span>
                    <span className="text-sm font-semibold text-emerald-400">₹{Number(resulttime).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="border-t border-surface-700/30 pt-2 flex justify-between">
                    <span className="text-sm font-medium text-surface-300">Total Value</span>
                    <span className="text-lg font-bold text-gradient">₹{Number(resultroi).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="card-premium p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-white mb-4">Investment Breakdown</h3>
              <div className="w-full h-72">
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sip;
