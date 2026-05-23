import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "../../contextAPI";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";

const LossRecovery = () => {
  const { user } = useUser();
  const [buy_value, setbuy_value] = useState(0);
  const [sell_value, setsell_value] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const [profit, setprofit] = useState(0);
  const [loss, setloss] = useState(0);
  const [percentage_loss, setpercentage_loss] = useState(0);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const Stock_buy_price = parseFloat(data["Stock_Buy_Price"]);
    const Quantity_Of_Stock = parseFloat(data["Quantity_Of_Stock"]);
    const Stock_Sell_Price = parseFloat(data["Stock_Sell_Price"]);
    const bv = Stock_buy_price * Quantity_Of_Stock;
    const sv = Stock_Sell_Price * Quantity_Of_Stock;
    setbuy_value(bv);
    setsell_value(sv);
    if (sv > bv) {
      const total_profit = sv - bv;
      setprofit(total_profit);
      const total_percentage = (total_profit / bv) * 100;
      setpercentage(total_percentage.toFixed(2));
      setloss(0);
      setpercentage_loss(0);
    } else {
      const total_loss = bv - sv;
      setloss(total_loss);
      const total_percentage_loss = bv ? ((total_loss * 100) / bv).toFixed(2) : 0;
      setpercentage_loss(total_percentage_loss);
      setprofit(0);
      setpercentage(0);
    }
  };

  const handleReset = () => {
    reset();
    setbuy_value(0);
    setsell_value(0);
    setprofit(0);
    setloss(0);
    setpercentage(0);
    setpercentage_loss(0);
  };

  const fields = [
    { name: "Stock_Buy_Price", label: "Stock Buy Price (₹)" },
    { name: "Quantity_Of_Stock", label: "Quantity of Stock" },
    { name: "Stock_Sell_Price", label: "Stock Sell Price (₹)" },
  ];

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-xl mx-auto card-premium p-6">
            <h2 className="text-xl font-bold text-white mb-6">Loss Recovery Calculator</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-surface-300 mb-1.5">{f.label}</label>
                  <input
                    {...register(f.name, { required: true })}
                    type="number"
                    step="any"
                    className="input-field"
                  />
                  {errors[f.name] && <span className="text-xs text-red-400 mt-1">Required</span>}
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1">Calculate</button>
                <button type="button" onClick={handleReset} className="btn-secondary flex-1">Reset</button>
              </div>
            </form>

            {buy_value ? (
              <div className={`mt-6 p-5 border rounded-xl space-y-2 ${
                profit
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-red-500/5 border-red-500/20"
              }`}>
                {loss ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-400">Loss</span>
                      <span className="text-sm font-semibold text-red-400">₹{loss.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="border-t border-surface-700/30 pt-2 flex justify-between">
                      <span className="text-sm font-medium text-surface-300">Recovery Needed</span>
                      <span className="text-lg font-bold text-red-400">{percentage_loss}%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-400">Profit</span>
                      <span className="text-sm font-semibold text-emerald-400">₹{profit.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="border-t border-surface-700/30 pt-2 flex justify-between">
                      <span className="text-sm font-medium text-surface-300">Profit %</span>
                      <span className="text-lg font-bold text-gradient">{percentage}%</span>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossRecovery;
