import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data.js';
import { UserContext } from '../../context/UserContext.jsx';
import CharAvatar from '../Cards/CharAvatar.jsx';
import toast from "react-hot-toast";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-gradient-to-b from-white to-purple-50 border-r border-gray-200/40 shadow-md p-5 sticky top-[61px] z-20">
      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-8">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 shadow"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-900 font-semibold leading-5 text-center">
          {user?.fullName || ""}
        </h5>
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-200
            ${
              activeMenu === item.label
                ? 'bg-purple-800 text-white shadow-md'
                : 'text-gray-700 hover:bg-purple-100 hover:text-purple-800'
            }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl transition-transform duration-200" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;



