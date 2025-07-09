import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data = [],
  label = '',
  totalAmount = 0,
  colors = [],
  showTextAnchor = true,
}) => {
    const renderCenterText = () => {
        return (
        <>
            <text
            x="50%"
            y="50%"
            dy={-25}
            textAnchor="middle"
            fill="#666"
            fontSize="14px"
            >
            {label || "NO LABEL"}
            </text>
            <text
            x="50%"
            y="50%"
            dy={0}
            textAnchor="middle"
            fill="#000"
            fontSize="20px"
            fontWeight="bold"
            >
            {totalAmount || "NO AMOUNT"}
            </text>
        </>
        );
    };


  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={120}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />

        {/* 🧠 THIS IS THE TEXT INSIDE DONUT */}
        {showTextAnchor && (
        <svg
            viewBox="0 0 400 300"
            style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
            }}
        >
            {renderCenterText()}
        </svg>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
