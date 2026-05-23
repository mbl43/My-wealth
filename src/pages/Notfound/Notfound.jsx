import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-950 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
        <p className="text-surface-400 mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Notfound;
