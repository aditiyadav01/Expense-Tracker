import React, { useContext } from 'react'
import {UserContext} from "../../context/UserContext.jsx";
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import {motion} from "motion/react";

const DashboardLayout = ({children,activeMenu}) => {
  const {user} = useContext(UserContext);
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }} 
    className="min-h-screen flex flex-col bg-gradient-to-r from-purple-200 via-white to-violet-300">
      <Navbar activeMenu={activeMenu} />

      {user && ( 
        <div className="flex">
          <div className="hidden min-[1080px]:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5 ">
            {children}
          </div>
        </div>
      )}  
    </motion.div>
  );
}


export default DashboardLayout