import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "../../contextAPI";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";

const LossRecovery = () => {
  const user = useUser();
  const [buy_value, setbuy_value] = useState(0);
  const [sell_value, setsell_value] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const [profit, setprofit] = useState(0);
  const [loss, setloss] = useState(0);
  const [percentage_loss, setpercentage_loss] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const Stock_buy_price = parseFloat(data["Stock_Buy_Price"]);
    const Quantity_Of_Stock = parseFloat(data["Quantity_Of_Stock"]);
    const Stock_Sell_Price = parseFloat(data["Stock_Sell_Price"]);
    const buy_value = Stock_buy_price * Quantity_Of_Stock;
    const sell_value = Stock_Sell_Price * Quantity_Of_Stock;
    setbuy_value(buy_value);
    setsell_value(sell_value);
    if (sell_value > buy_value) {
      const total_profit = sell_value - buy_value;
      setprofit(total_profit);
      const total_percentage = (total_profit / buy_value) * 100;
      setpercentage(total_percentage.toFixed(2));
      setloss(0);
      setpercentage_loss(0);
    } else {
      const total_loss = buy_value - sell_value;
      setloss(total_loss);
      const total_percentage_loss = buy_value
        ? ((total_loss * 100) / buy_value).toFixed(2)
        : 0;
      setpercentage_loss(total_percentage_loss);
      setprofit(0);
      setpercentage(0);
    }
    console.log("Stock Buy Price: ", Stock_buy_price);
    console.log("Quantity Of Stock: ", Quantity_Of_Stock);
    console.log("Stock Sell Price: ", Stock_Sell_Price);
    console.log(buy_value, sell_value);
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
  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="max-w-xl mx-auto rounded-3xl p-6 bg-white shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            <div>
              <label
                htmlFor="Stock Buy Price"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Stock Buy Price:
              </label>
              <input
                {...register("Stock_Buy_Price", { required: true })}
                id="Stock_Buy_Price"
                type="number"
                step="any"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              />
              {errors["Stock_Buy_Price"] && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="Quantity_Of_Stock"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Quantity Of Stock:
              </label>
              <input
                {...register("Quantity_Of_Stock", { required: true })}
                type="number"
                id="Quantity_Of_Stock"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              />
              {errors["Quantity_Of_Stock"] && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="Stock_Sell_Price"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Stock Sell Price:
              </label>
              <input
                {...register("Stock_Sell_Price", { required: true })}
                id="Stock_Sell_Price"
                type="number"
                step="any"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              />
              {errors["Stock_Sell_Price"] && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start mt-2">
              <button
                type="submit"
                className="py-3 px-6 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-6 bg-gray-500 text-white font-semibold text-lg rounded-xl hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Results section */}
          {buy_value ? (
            <div className="mt-8 p-4 bg-gray-50 rounded-2xl shadow-inner">
              <div className="flex flex-col gap-1 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Results
                </h3>
                <p className="text-xl font-semibold mt-1">
                  {loss ? (
                    <span className="text-red-500">
                      Need a gain to recover your Loss On Remaining Capital%:{" "}
                      {percentage_loss} %
                    </span>
                  ) : (
                    <>
                      Profit In %:
                      <span className="font-medium"> {percentage} %</span>
                    </>
                  )}
                </p>

                <p className="text-xl font-semibold mt-1">
                  {profit ? (
                    <span className="text-green-600 font-bold">
                      Profit in INR: {profit} ₹
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold">
                      Loss In INR: {loss} ₹
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default LossRecovery;
