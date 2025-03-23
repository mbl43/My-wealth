import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Navbar, Sidebar } from "../index";
import { useUser } from "../../contextAPI";
import male from "../../assets/character/male.png";
const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        {user && (
          <div className="max-w-screen-xl mx-auto bg-gray-100 m-auto rounded-2xl p-6  ">
            <div className="p-4 flex justify-center items-center flex-wrap flex-col text-center">
              <div className="rounded-full w-[200px] border-2 border-blue-500 ">
                <img src={male} className="rounded-full" alt="profile image" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mt-7">
                <span className="text-gray-500">Email:</span> {user.email}
              </h3>
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mt-7">
                  <span className="text-gray-500">Name:</span> {user.displayName}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
