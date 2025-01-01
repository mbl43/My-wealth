import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Notfound,Notification} from "./pages/index";
import { Login, SignUp,Dashboard } from "./components/index";
import Profile from "./components/Profile"
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer position="top-right" autoClose={1200} />
      <AnimatedCursor
  innerSize={8}
  outerSize={35}
  innerScale={1}
  outerScale={2}
  outerAlpha={0}
  hasBlendMode={true}
  innerStyle={{
    backgroundColor: 'var(--cursor-color)'
  }}
  outerStyle={{
    border: '3px solid var(--cursor-color)'
  }}
/>
    </>
  );
}

export default App;
