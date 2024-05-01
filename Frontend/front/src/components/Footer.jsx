import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-6 w-[83vw] ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white text-lg font-semibold">FundWiser</h2>
            <p className="text-gray-400">@2024, Made with passion for a better Financial Activities.</p>
          </div>
          <nav className="flex flex-col md:flex-row  gap-4">
            <Link to="/dashboard" className="text-white hover:text-gray-400">Dashboard</Link>
            <Link to="/contact" className="text-white hover:text-gray-400">Contact</Link>
            <Link to="/profile" className="text-white hover:text-gray-400">Profile</Link>
            <Link to="/" className="text-white hover:text-gray-400">About</Link>

          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
