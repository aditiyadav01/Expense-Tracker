import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white/70 border-b border-gray-200/60 backdrop-blur-md py-4 px-6 sticky top-0 z-30 shadow-sm">
      {/* Logo & Menu Button */}
      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-xl font-semibold text-purple-800 tracking-tight">
          Expense Tracker
        </h2>
      </div>

      {/* Mobile Slide-In Menu */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 h-screen bg-white shadow-xl z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;








