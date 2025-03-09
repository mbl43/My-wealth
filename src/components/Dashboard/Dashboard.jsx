import { Sidebar, Navbar, Modal, Dialog } from "../index";
import { useUser } from "../../contextAPI";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Sidebar */}
      <div className="flex flex-1 ">
        <Sidebar />

        {/* Main Dashboard Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Header area  */}
          <div className="flex justify-between items-center mb-6">
            {/* Greeting */}
            <div>
              <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
                Welcome back,{" "}
                <span className="font-bold text-blue-500">
                  {user?.displayName}!
                </span>
              </h1>
            </div>

            {/* Data Modal */}
            <div>
              <Modal />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Total Investment</h2>
              <p className="text-gray-600">45000</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Total Investment</h2>
              <p className="text-gray-600">45000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {user && <Dialog uid={user.uid} />}
    </div>
  );
};

export default Dashboard;
