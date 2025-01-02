import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="h-16"></div> {/* Spacer for fixed navbar */}
      <div className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            {isOpen && (
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/" className="text-primary">Home</Link></li>
                <li><a>Courses</a></li>
                <li><a>Trading Tools</a></li>
                <li><a>About</a></li>
                <li><Link to="/contact" className="text-primary">Contact</Link></li>
              </ul>
            )}
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl text-primary font-bold">
            <img src="/logo.png" alt="IT4B Logo" className="h-8 w-auto mr-2" />
            IT4B
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><Link to="/" className="text-primary font-semibold">Home</Link></li>
            <li><a className="hover:text-primary transition-colors">Courses</a></li>
            <li><a className="hover:text-primary transition-colors">Trading Tools</a></li>
            <li><a className="hover:text-primary transition-colors">About</a></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
