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
import { Pencil, Trash2 } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import Nominee from "../Modal/Nominee";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
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
        // Nominee details

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
      console.table(templateParams);
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
  
//   const API_BASE_URL = "https://my-wealth-backend-production.up.railway.app";
  
//   const sendInvestmentDataToBackend = async (name, email, investments) => {
//     try {
//         const payload = { name, email, investments };
//         console.log("Sending payload:", payload); // Log the payload

//         const response = await fetch(`${API_BASE_URL}/update-investment`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload), 
//         });

//         if (!response.ok) {
//             const errorMessage = await response.text(); // Get the response body
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//         }

//         const data = await response.json();
//         console.log("Success:", data);
//     } catch (error) {
//         console.error("Error sending data:", error);
//     }
// };


    
//   useEffect(() => {
//     if (investments && name && email) {
//       sendInvestmentDataToBackend(name, email, investments);
//     }
//   }, [investments, name, email]);

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
            <div>
              <Button
                id="sendemail"
                onClick={() => sendNotification(email, name)}
                variant="gradient"
                className="bg-blue-700 capitalize sm:text-sm p-2 m-2"
              >
                Send mail to nominee
              </Button>

              <Modal
                id="Addinvest"
                investmentCount={investmentCount}
                onSuccess={fetchInvestments}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
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

                {/* {name && email && ( */}
                <div className="bg-white rounded-lg shadow p-4">
                  <Nominee />
                  <h2 className="text-lg font-semibold mb-2">
                    Nominee Information
                  </h2>
                  <p className="text-blue-500 font-bold text-lg">{name}</p>
                  <p className="text-gray-500 text-sm">{email}</p>
                </div>
                {/* )} */}

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
                      <div className="flex justify-between mb-2 space-x-3">
                        <div className="flex gap-4">
                          <h3 className="text-xs sm:text-xl font-medium text-blue-600 m-auto">
                            {inv.formattedDate}
                          </h3>
                          <div className="bg-green-100 text-green-800 text-xs font-medium rounded-md m-auto p-2">
                            ₹{inv.totalValue.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => deleteInvestmentDetail(inv.id)}
                            className="bg-red-200 cursor-pointer rounded-lg p-1 m-auto"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => editInvestmentDetail(inv.id)}
                            className="bg-green-200 cursor-pointer rounded-lg p-1 m-auto"
                          >
                            <Pencil size={18} />
                          </button>
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
                        {inv.Gold > 0 && (
                          <p>Gold: ₹{inv.Gold.toLocaleString()}</p>
                        )}
                        {inv.Silver > 0 && (
                          <p>Silver: ₹{inv.Silver.toLocaleString()}</p>
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
