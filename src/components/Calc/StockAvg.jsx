import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "../../contextAPI";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";

const StockAvg = () => {
  const { user } = useUser();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [firstbuy_avg, setfirstbuy_avg] = useState(0);
  const [secondbuy_avg, setsecondbuy_avg] = useState(0);
  const [TotalQuantity, setQuantity] = useState(0);
  const [avg_price_stock, setavg_price_stock] = useState(0);

  const onSubmit = (data) => {
    const First_Purchase_Quantity = parseInt(data["First-purchase-quantity"]);
    const res = Object.entries(data);
    const First_Purchase_Price_of_Stock = parseInt(res[1][1]);
    const Second_Purchase_Quantity = parseInt(res[2][1]);
    const Second_Purchase_Price_of_Stock = parseInt(res[3][1]);
    if (isNaN(First_Purchase_Quantity) || isNaN(Second_Purchase_Quantity) || isNaN(First_Purchase_Price_of_Stock) || isNaN(Second_Purchase_Price_of_Stock)) {
      alert("Add proper values");
      return false;
    }
    setQuantity(First_Purchase_Quantity + Second_Purchase_Quantity);
    const first_buy = First_Purchase_Price_of_Stock * First_Purchase_Quantity;
    setfirstbuy_avg(first_buy);
    const second_buy = Second_Purchase_Price_of_Stock * Second_Purchase_Quantity;
    setsecondbuy_avg(second_buy);
    const avg_total_price = first_buy + second_buy;
    const total_purchase = avg_total_price / (First_Purchase_Quantity + Second_Purchase_Quantity);
    setavg_price_stock(total_purchase.toFixed(2));
  };

  const handleReset = () => {
    reset();
    setQuantity(0);
    setavg_price_stock(0);
    setfirstbuy_avg(0);
    setsecondbuy_avg(0);
  };

  const fields = [
    { name: "First-purchase-quantity", label: "1st Purchase Qty" },
    { name: "First-purchase-price", label: "1st Purchase Price (₹)" },
    { name: "Second-purchase-quantity", label: "2nd Purchase Qty" },
    { name: "Second-purchase-price", label: "2nd Purchase Price (₹)" },
  ];

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-2xl mx-auto card-premium p-6">
            <h2 className="text-xl font-bold text-white mb-6">Stock Average Calculator</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-surface-300 mb-1.5">{f.label}</label>
                  <input
                    {...register(f.name, { required: true })}
                    type="number"
                    className="input-field"
                  />
                  {errors[f.name] && <span className="text-xs text-red-400 mt-1">Required</span>}
                </div>
              ))}
              <div className="sm:col-span-2 flex gap-3 mt-2">
                <button type="submit" className="btn-primary flex-1">Calculate</button>
                <button type="button" onClick={handleReset} className="btn-secondary flex-1">Reset</button>
              </div>
            </form>

            {firstbuy_avg ? (
              <div className="mt-6 p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-surface-400">Total Amount</span>
                  <span className="text-sm font-semibold text-white">₹{(firstbuy_avg + secondbuy_avg).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-surface-400">Total Quantity</span>
                  <span className="text-sm font-semibold text-white">{TotalQuantity}</span>
                </div>
                <div className="border-t border-surface-700/30 pt-2 flex justify-between">
                  <span className="text-sm font-medium text-surface-300">Average Price/Stock</span>
                  <span className="text-lg font-bold text-gradient">₹{avg_price_stock}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAvg;
