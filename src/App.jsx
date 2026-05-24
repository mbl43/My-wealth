import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy loaded components
const Home = lazy(() => import("./pages/Home/Home"));
const Notfound = lazy(() => import("./pages/Notfound/Notfound"));
const Login = lazy(() => import("./components/Login/Login"));
const SignUp = lazy(() => import("./components/Signup/SignUp"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Sip = lazy(() => import("./components/Calc/Sip"));
const LossRecovery = lazy(() => import("./components/Calc/LossRecovery"));
const StockAvg = lazy(() => import("./components/Calc/StockAvg"));

// Page loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-surface-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-surface-700 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-2xl text-white">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/auth" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/sip" element={<Sip />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stockaverage" element={<StockAvg />} />
              <Route path="/loss" element={<LossRecovery />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        theme="dark"
        toastStyle={{
          backgroundColor: "#1e293b",
          color: "#f1f5f9",
          borderRadius: "12px",
          border: "1px solid rgba(51, 65, 85, 0.5)",
        }}
        style={{ zIndex: 555 }}
      />
    </>
  );
}

export default App;
