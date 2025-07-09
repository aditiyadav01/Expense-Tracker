import React from "react";
import { LuTrendingUpDown, LuWallet } from "react-icons/lu";
import { BiPieChartAlt } from "react-icons/bi";
import { motion } from "motion/react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      {/* Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-[55vw] px-12 pt-8 pb-12 bg-gradient-to-br from-white via-purple-50 to-purple-100"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-800 to-pink-700 text-transparent bg-clip-text drop-shadow-md mb-8">
          Expense Tracker
        </h1>

        {children}
      </motion.div>

      {/* Right Side */}
      <div className="hidden md:block w-[45vw] h-screen bg-gradient-to-br from-purple-100 via-violet-200 to-purple-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Decorative Shapes (less blur) */}
        <div className="w-52 h-52 rounded-[50px] bg-purple-600 absolute -top-12 -left-6 opacity-60 " />
        <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 opacity-60 " />
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -bottom-7 -left-5 opacity-50 " />

        {/* Stat Cards */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 grid grid-cols-1 gap-6 mt-28"
        >
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Income & Expenses"
            value="$430,000"
            color="bg-purple-600"
          />
          <StatsInfoCard
            icon={<LuWallet />}
            label="Stay in Budget"
            value="Save Smarter"
            color="bg-fuchsia-600"
          />
          <StatsInfoCard
            icon={<BiPieChartAlt />}
            label="Analyze Spending Patterns"
            value="Visual Insights"
            color="bg-indigo-600"
          />
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-16 right-8 text-purple-900 z-10 text-right max-w-xs"
        >
          <h3 className="text-lg font-medium italic text-purple-700 leading-snug">
            “Manage money, live better.”
          </h3>
          <p className="text-sm text-purple-500 mt-1 font-light tracking-wide">
            — Your personal finance assistant
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-medium text-gray-800">{value}</span>
      </div>
    </div>
  );
};
