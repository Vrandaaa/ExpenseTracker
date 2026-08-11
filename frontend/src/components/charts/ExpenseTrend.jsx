import React from 'react'
import { useChartData } from "../../hooks/useChartData";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";
import './ExpenseTrend.css'

const ExpenseTrend = () => {
    const { expenseTrendData } = useChartData();
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short"
        });
    };
    const CustomTooltip = ({ active, payload }) => {

        if (!active || !payload || !payload.length) {
            return null;
        }

        const data = payload[0].payload;

        return (
            <div
                style={{
                    background: "#fff",
                    padding: "12px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
            >
                <p>{data.date}</p>

                {
                    data.breakdown.map((item, index) => (
                        <p key={index}>
                            {item.title} : ₹{item.amount}
                        </p>
                    ))
                }

                <hr />

                <p>
                    Total : ₹{data.expense}
                </p>
            </div>
        );
    };
    return (
        <div className="expenseTrendCard">
            <div className='chartHeading'>
                <h3>Expense Trend</h3>
            </div>
            {
                expenseTrendData.length === 0 ? <p className='empty'>No financial data available</p> :

                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={expenseTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date"
                                tickFormatter={formatDate}
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />

                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="#f992da"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
            }
        </div>
    )
}

export default ExpenseTrend