import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import Badge from "@mui/material/Badge";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { RiAccountCircle2Fill, RiAccountCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { IoIosNotifications } from "react-icons/io";

const Navbar = ({ user }) => {
  const [isMobile, setIsMobile] = useState(false); // State to toggle mobile menu
  const toggleMenu = () => setIsMobile(!isMobile);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-[#0063c5] shadow-lg sticky top-0 z-50">
      <div className="w-full max-h-20 px-4">
        <div className="flex flex-row items-center max-w-7xl mx-auto justify-between py-4">
          {/* Logo Section */}
          <div className="md:text-3xl font-bold text-white sm:text-base sm:text-center">
            <h1>
              <Link
                to="/"
                className="hover:text-[#008000]-200 transition duration-300"
              >
                My Wealth
              </Link>
            </h1>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center space-x-5">
            {!user && (
              <Link
                to="/auth"
                className="flex gap-x-1.5 justify-center items-center text-white"
              >
                <RiAccountCircleFill size={30} /> SignUp{" "}
              </Link>
            )}
            <button onClick={toggleMenu} className="text-white text-3xl">
              {isMobile ? <IoCloseSharp /> : <RxHamburgerMenu />}
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`font-medium md:flex gap-x-3 transition-transform duration-300 ${
              isMobile
                ? "flex flex-col absolute z-10 top-72x left-0 w-full bg-[#051378] p-4 items-center h-screen justify-center gap-y-4"
                : "hidden md:flex"
            }`}
            onClick={() => setIsMobile(false)} // Close menu on link click
          >
            {["Home", "Services", "Contact"].map((text) => (
              <li key={text}>
                <NavLink
                  style={({ isActive }) => ({
                    fontWeight: isActive && "medium",
                    color: isActive && "#4afc70",
                  })}
                  to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                  className="text-white hover:text-[#4afc70] transition duration-300 text-3xl md:text-lg font-medium"
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout Button (Visible only when logged in) */}
          {user && (
            <div className="flex items-center justify-center space-x-5">
              <Link to="/profile">
                <Tooltip title="Profile" arrow>
                  <div
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label="Profile"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") console.log("Profile activated");
                    }}
                  >
                    <RiAccountCircle2Fill size={40} className="text-white" />
                  </div>
                </Tooltip>
              </Link>

              <Link to="/notification">
                <Badge color="success" badgeContent={1}>
                  <IoIosNotifications
                    size={40}
                    className="text-white"
                    color="action"
                  />
                </Badge>
              </Link>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  backgroundColor: "#008000",
                  fontFamily: "Poppins, Arial, sans-serif",
                  fontSize: "16px",
                  textTransform: "capitalize",
                }}
                className="hidden md:inline-block font-medium text-white text-base px-5 py-2 rounded-lg hover:bg-[#4afc70] shadow-lg transition-transform transform hover:scale-105 duration-200 capitalize"
              >
                Logout
              </Button>
            </div>
          )}

          {/* Authentication Buttons (Visible only when not logged in) */}
          {!user && (
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#008000",
                  fontFamily: "Poppins, Arial, sans-serif",
                  fontSize: "16px",
                  textTransform: "capitalize",
                }}
                className="font-medium text-white text-base px-5 py-2 rounded-lg hover:bg-[#4afc70] shadow-lg transition-transform transform hover:scale-105 duration-200 capitalize"
              >
                <Link to="/auth">Sign Up</Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#008000",
                  fontFamily: "Poppins, Arial, sans-serif",
                  fontSize: "16px",
                  textTransform: "capitalize",
                }}
                className="font-medium text-white text-base px-5 py-2 rounded-lg hover:bg-[#4afc70] shadow-lg transition-transform transform hover:scale-105 duration-200 capitalize"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
