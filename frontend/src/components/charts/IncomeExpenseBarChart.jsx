import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import { useChartData } from "../../hooks/useChartData";
import './IncomeExpenseBarChart.css'
const IncomeExpenseBarChart = () => {

    const { monthlyData } = useChartData();

    return (
        <div className="monthlyBarChart">

            <h3>Monthly Overview</h3>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="income"
                        fill="#6dec9c"
                        radius={[6, 6, 0, 0]}
                    />

                    <Bar
                        dataKey="expense"
                        fill="#f88888"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default IncomeExpenseBarChart;