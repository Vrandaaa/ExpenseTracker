import { useContext } from "react";
import { TransactionContext } from "../Context/TransactionContext";

export function useChartData() {

    const { transactions } = useContext(TransactionContext);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const monthlyTotals = {};
    const expenseTotals = {};
    const incomeTotals = {};

    // -------- Monthly income/expense --------
    
    transactions.forEach(transaction => {

        const amount = Number(transaction.amount);

        const month =
            months[new Date(transaction.date).getMonth()];


        if (!monthlyTotals[month]) {
            monthlyTotals[month] = {
                income: 0,
                expense: 0
            };
        }

        if (transaction.type === "Income") {
            monthlyTotals[month].income += amount;
        }
        else {
            monthlyTotals[month].expense += amount;
        }

    });

    const monthlyData = months.map(month => ({
        month,
        income: monthlyTotals[month]?.income || 0,
        expense: monthlyTotals[month]?.expense || 0
    }));

    // -------- Daily trends --------


    transactions.forEach(transaction => {

        const amount = Number(transaction.amount);
        const date = transaction.date;


        const target =
            transaction.type === "Income"
                ? incomeTotals
                : expenseTotals;



        if (!target[date]) {
            target[date] = {
                total: 0,
                breakdown: []
            };
        }


        target[date].total += amount;


        target[date].breakdown.push({
            title: transaction.title,
            amount
        });


    });

    const expenseTrendData = Object.keys(expenseTotals)
        .map(date => ({
            date,
            expense: expenseTotals[date].total,
            breakdown: expenseTotals[date].breakdown
        }))
        .sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

    const incomeTrendData = Object.keys(incomeTotals)
        .map(date => ({
            date,
            income: incomeTotals[date].total,
            breakdown: incomeTotals[date].breakdown
        }))
        .sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );


    return {
        monthlyData,
        expenseTrendData,
        incomeTrendData
    };
}