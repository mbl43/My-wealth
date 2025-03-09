import { useUser } from "../../contextAPI";
import { Footer, Navbar } from "../index";

const Layout = ({ children }) => {

  return (
    <>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
