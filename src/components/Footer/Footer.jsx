import { Link } from "react-router-dom";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-950 border-t border-surface-800/50">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-white">
                My <span className="text-gradient">Wealth</span>
              </span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed">
              A premium wealth-management platform helping families track,
              protect, and grow their financial future with confidence.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-sm font-semibold text-surface-200 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Login", "Sign Up"].map((item) => (
                <li key={item}>
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : item === "Sign Up"
                        ? "/auth"
                        : `/${item.toLowerCase()}`
                    }
                    className="text-sm text-surface-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Tools ── */}
          <div>
            <h3 className="text-sm font-semibold text-surface-200 uppercase tracking-wider mb-4">
              Tools
            </h3>
            <ul className="space-y-3">
              {[
                { name: "SIP Calculator", path: "/sip" },
                { name: "Loss Recovery", path: "/loss" },
                { name: "Stock Average", path: "/stockaverage" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-surface-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="text-sm font-semibold text-surface-200 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mangeshlemte.a23@gmail.com"
                  className="flex items-center gap-2 text-sm text-surface-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  <HiOutlineMail size={16} />
                  mangeshlemte.a23@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+917745028543"
                  className="flex items-center gap-2 text-sm text-surface-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  <HiOutlinePhone size={16} />
                  +91 7745028543
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-8 border-t border-surface-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">
            © {currentYear} My Wealth. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-surface-500 hover:text-surface-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-xs text-surface-500 hover:text-surface-300 transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
