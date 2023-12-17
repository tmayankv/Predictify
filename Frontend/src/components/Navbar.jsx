import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Logo
        </Link>

        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/services" className="text-white hover:text-gray-300">
            Services
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-300">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
