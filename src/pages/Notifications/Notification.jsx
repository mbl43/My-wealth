import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/index";
import { useUser } from "../../contextAPI";

const Notification = () => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar user={user} />
      {user && (
        <div className="">
          Zero notification
          {/* <Dialog/> */}
        </div>
      )}
    </>
  );
};

export default Notification;
