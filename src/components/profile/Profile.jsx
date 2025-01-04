import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import {Navbar} from "../index"
import { useUser } from "../../contextAPI";
const Profile = () => {
  const {user} = useUser()
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar user={user} />
      {user && (
        <div className="max-w-screen-xl mx-auto">
          <div className="p-4 flex justify-center items-center flex-wrap flex-col text-center">
            <div className="rounded-full">
              <img
                src="https://placehold.co/120"
                className="rounded-full"
                alt="profile image"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mt-7">
              Email: {user.email}
            </h3>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mt-7">
                Name: {user.displayName}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
