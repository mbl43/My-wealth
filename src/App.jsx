import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Notfound, Notification } from "./pages/index";
import { Login, SignUp, Dashboard ,Profile} from "./components/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedCursor from "react-animated-cursor";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<SignUp />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/" index element={<Home />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </BrowserRouter>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        zIndex={9999}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "var(--cursor-color)",
          pointerEvents: "none",
        }}
        outerStyle={{
          border: "3px solid var(--cursor-color)",
          pointerEvents: "none",
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={1200}
        style={{ zIndex: 555 }}
      />
    </>
  );
}

export default App;
