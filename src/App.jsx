import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Notfound, Notification } from "./pages/index";
import { Login, SignUp, Dashboard ,Profile,Sip,LossRecovery,StockAvg} from "./components/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/auth" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/sip" element={<Sip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/" index element={<Home />} /> */}
            <Route path="/notification" element={<Notification />} />
            <Route path="/stockaverage" element={<StockAvg />} />
            <Route path="/loss" element={<LossRecovery />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        style={{ zIndex: 555 }}
      />
    </>
  );
}

export default App;
