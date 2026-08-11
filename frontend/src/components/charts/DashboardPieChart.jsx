import React from 'react';
import { useFinanceStats } from '../../hooks/useFinanceStats';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

import './DashboardPieChart.css';

const DashboardPieChart = () => {

    const { incomeAmount, expenseAmount, balance } = useFinanceStats();

    const COLORS = [
        '#0bd455', // Income
        '#de0e0e', // Expense
        '#83adf1'  // Savings
    ];

    const pieData = [
        {
            name: 'Income',
            value: incomeAmount
        },
        {
            name: 'Expense',
            value: expenseAmount
        },
        {
            name: 'Savings',
            value: balance
        }
    ];

    const total = pieData.reduce(
        (sum, item) => sum + item.value,
        0
    );

    if (total === 0) {
        return (
            <div className="dashboardPieChart">
                <div className="chartHeading">
                    <h3>Financial Overview</h3>
                </div>

                <div className="noChartData">
                    No financial data available
                </div>
            </div>
        );
    }

    return (
        <div className="dashboardPieChart">

            <div className="chartHeading">
                <h3>Financial Overview</h3>

                
            </div>

            <div className="chartWrapper">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>

                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={100}
                            paddingAngle={1}
                            dataKey="value"
                            nameKey="name"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={entry.name}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />

                    </PieChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default DashboardPieChart;