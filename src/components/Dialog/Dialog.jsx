import { X } from "lucide-react";

const Dialog = ({ user }) => {
  return (
    <div className="max-w-[450px] h-[350px] bg-gray-800 rounded-3xl">
      <div className="flex container p-6">
        <h3 className="mx-auto text-white text-3xl font-medium">Disclaimer</h3>
        <span className="text-white cursor-pointer">
          <X />
        </span>
      </div>
      <hr className="mx-5"/>
      <div className="">
        <p className="text-white p-4">
          My Wealth provides general information for educational purposes and
          does not offer financial advice or professional consulting. Users
          should consult qualified advisors for specific financial decisions.
          While we strive for accuracy, we are not responsible for errors,
          omissions, or any losses incurred. Use the app at your own risk.
        </p>
      </div>
    </div>
  );
};

export default Dialog;
