import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "../../contextAPI";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";

const StockAvg = () => {
  const user = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [firstbuy_avg, setfirstbuy_avg] = useState(0);
  const [secondbuy_avg, setsecondbuy_avg] = useState(0);
  const [TotalQuantity, setQuantity] = useState(0);
  const [avg_price_stock, setavg_price_stock] = useState(0);
  const onSubmit = (data) => {
    const res = Object.entries(data);
    const First_Purchase_Quantity = parseInt(data["First-purchase-quantity"]);
    const First_Purchase_Price_of_Stock = parseInt(res[1][1]);
    const Second_Purchase_Quantity = parseInt(res[2][1]);
    const Second_Purchase_Price_of_Stock = parseInt(res[3][1]);
    if (
      isNaN(First_Purchase_Quantity) ||
      isNaN(Second_Purchase_Quantity) ||
      isNaN(First_Purchase_Price_of_Stock) ||
      isNaN(Second_Purchase_Price_of_Stock)
    ) {
      alert("Add proper values");
      return false;
    }
    setQuantity(First_Purchase_Quantity + Second_Purchase_Quantity);
    console.log(First_Purchase_Quantity * First_Purchase_Price_of_Stock);
    const first_buy = First_Purchase_Price_of_Stock * First_Purchase_Quantity;
    setfirstbuy_avg(first_buy);
    const second_buy =
      Second_Purchase_Price_of_Stock * Second_Purchase_Quantity;
    setsecondbuy_avg(second_buy);
    const avg_total_price = first_buy + second_buy;
    const total_purchase =
      avg_total_price / (First_Purchase_Quantity + Second_Purchase_Quantity);
    console.log("total+", total_purchase);
    setavg_price_stock(total_purchase.toFixed(2));
    console.log("First-Purchase Price of Stock: ", First_Purchase_Quantity);
    console.log(
      "First_Purchase_Price_of_Stock ",
      First_Purchase_Price_of_Stock
    );
    console.log("Second-Purchase Price of Stock: ", Second_Purchase_Quantity);
    console.log(
      "Second_Purchase_Price_of_Stock ",
      Second_Purchase_Price_of_Stock
    );
  };
  const handleReset = () => {
    reset();
    setQuantity(0);
    setavg_price_stock(0);
    setfirstbuy_avg(0);
    setsecondbuy_avg(0);
  };
  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="max-w-3xl mx-auto rounded-3xl p-6 bg-white shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label
                htmlFor="first-purchase-quantity"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                First-Purchase Quantity:
              </label>
              <input
                {...register("First-purchase-quantity", { required: true })}
                id="first-purchase-quantity"
                type="number"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              />
              {errors["First-purchase-quantity"] && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="first-purchase-price"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                First-Purchase Price of Stock:
              </label>
              <input
                {...register("First-purchase-price", { required: true })}
                type="number"
                id="first-purchase-price"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              />
              {errors["First-purchase-price"] && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="second-purchase-quantity"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Second-Purchase Quantity:
              </label>
              <input
                {...register("Second-purchase-quantity", { required: true })}
                id="second-purchase-quantity"
                type="number"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              />
              {errors["Second-purchase-quantity"] && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="second-purchase-price"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Second-Purchase Price of Stock:
              </label>
              <input
                {...register("Second-purchase-price", { required: true })}
                type="number"
                id="second-purchase-price"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              />
              {errors["Second-purchase-price"] && (
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
          {firstbuy_avg ? (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl shadow-inner">
              <div className="flex flex-col gap-3 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Results
                </h3>
                <p className="text-lg">
                  Total Amount:{" "}
                  <span className="font-medium">
                    {firstbuy_avg + secondbuy_avg} ₹
                  </span>
                </p>
                <p className="text-lg">
                  Total Quantity:{" "}
                  <span className="font-medium">{TotalQuantity}</span>
                </p>
                <p className="text-xl font-semibold mt-1">
                  Average Price per Stock:{" "}
                  <span className="text-green-600 font-bold">
                    {avg_price_stock} ₹
                  </span>
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

export default StockAvg;
