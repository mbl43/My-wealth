import { Footer, Navbar } from "../index";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface-950">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
