import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="shadow-lg bg-[#0063c5] text-white rounded-lg overflow-hidden">
      <div className="w-full px-6 py-8 flex flex-col items-center">
        {/* Header Section */}
        <div className="py-4">
          <h1 className="text-4xl font-bold tracking-wide hover:underline">
            <Link to="/">My Wealth</Link>
          </h1>
        </div>

        <div className="w-full border-t border-gray-200 opacity-30 my-4"></div>

        <div className="w-full flex flex-col md:flex-row justify-around items-center gap-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-sm opacity-80 ">
              Email:
              <a href="mailto:"> mangeshlemte.a23@gmail.com</a>
            </p>
            <p className="text-sm opacity-80 py-1">
              Phone:<a href="tel:+917745028543"> 7745028543</a>
            </p>
          </div>
          
          <div className="text-center w-1/2">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-sm opacity-80">
            My Wealth helps users track investments, SIPs, and unclaimed funds while ensuring privacy. It sends updates and notifies heirs in emergencies, fostering financial awareness.
            </p>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 opacity-30 mt-6"></div>

        <div className="py-4 text-sm opacity-70">
          © 2024 My Wealth. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
