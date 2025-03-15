import { Sidebar, Navbar, Modal, Dialog } from "../index";
import { useUser } from "../../contextAPI";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const Dashboard = () => {
  const { user } = useUser();
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [investments, setInvestments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

      const investmentData = [];
      let initialInvestment = null;

      detailsSnapshot.forEach((doc) => {
        const data = doc.data();

        // Ensuring numeric values are properly parsed
        const stocksValue = parseFloat(data.stocks_value) || 0;
        const mutualFundValue = parseFloat(data.mutual_fund) || 0;
        const ppfValue = parseFloat(data.ppf_value) || 0;
        const fdValue = parseFloat(data.fd_value) || 0;

        const investmentValue =
          stocksValue + mutualFundValue + ppfValue + fdValue;

        // Formatting date from timestamp
        let formattedDate = "No date available";
        if (data.timestamp?.toDate) {
          formattedDate = data.timestamp.toDate().toLocaleDateString("en-IN");
        } else if (data.date) {
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

      if (initialInvestment) {
        setName(initialInvestment.name || "");
        setEmail(initialInvestment.email || "");
      }

      console.log("Total Investment:", totalAmount, "Total Count:", count);
    } catch (err) {
      console.error("Error fetching investments:", err.message);
      setError("Failed to load investments. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchInvestments();
  }, [fetchInvestments]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar user={user} />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
              Welcome back,{" "}
              <span className="font-bold text-blue-500">
                {user?.displayName || "User"}
              </span>
            </h1>
            <Modal
              investmentCount={investmentCount}
              onSuccess={fetchInvestments}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Total Investment
                  </h2>
                  <p className="text-gray-600 font-bold text-xl">
                    ₹{totalInvestment.toLocaleString()}
                  </p>
                </div>

                {name && email && (
                  <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">
                      Nominee Information
                    </h2>
                    <p className="text-blue-500 font-bold text-lg">{name}</p>
                    <p className="text-gray-500 text-sm">{email}</p>
                  </div>
                )}

                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Investment Records
                  </h2>
                  <p className="text-gray-600 font-bold text-xl">
                    {investmentCount}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">
                Your Investment History
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investments.length === 0 ? (
                  <p className="text-gray-500 col-span-3 text-center py-10">
                    No investments found. Add your first investment using the
                    button above.
                  </p>
                ) : (
                  investments.map((inv) => (
                    <div
                      key={inv.id}
                      className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-blue-600">
                          {inv.formattedDate}
                        </h3>
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          ₹{inv.totalValue.toLocaleString()}
                        </div>
                      </div>

                      <div className="mt-2 space-y-1 text-sm">
                        {inv.stocks_value > 0 && (
                          <p>Stocks: ₹{inv.stocks_value.toLocaleString()}</p>
                        )}
                        {inv.mutual_fund > 0 && (
                          <p>
                            Mutual Funds: ₹{inv.mutual_fund.toLocaleString()}
                          </p>
                        )}
                        {inv.ppf_value > 0 && (
                          <p>PPF: ₹{inv.ppf_value.toLocaleString()}</p>
                        )}
                        {inv.fd_value > 0 && (
                          <p>
                            Fixed Deposits: ₹{inv.fd_value.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {user && <Dialog uid={user.uid} />}
    </div>
  );
};

export default Dashboard;
