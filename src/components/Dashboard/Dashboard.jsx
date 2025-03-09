import { Sidebar, Navbar, Modal, Dialog } from "../index";
import { useUser } from "../../contextAPI";

const Dashboard = () => {
  // Retrieve user data from context
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Sidebar below Navbar */}
      <div className="flex flex-1 w-full">
        <Sidebar />

        {/* Main Dashboard Content */}
        <div className="overflow-y-auto flex justify-between w-[100vw] h-full flex-wrap">
          {/* Greeting */}
          <div className="m-3">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
              Welcome back,{" "}
              <span className="font-bold text-blue-500">
                {user?.displayName}!
              </span>
            </h1>
          </div>
          {/* Modal */}
          <div className="m-2">
            <Modal />
          </div>
        </div>

        {/* Dialog */}
        {user && <Dialog uid={user.uid} />}
      </div>
    </div>
  );
};

export default Dashboard;
