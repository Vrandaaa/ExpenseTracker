import { createContext, useState, useEffect } from "react";
export const TransactionContext = createContext();

export default function TransactionContextProvider({ children }) {
    console.log("context loaded")
    const [transactions, setTransactions] = useState(() => {
        return JSON.parse(
            localStorage.getItem("transactions")
        ) || [];
    });
    function addTransaction(transaction) {

        setTransactions(prev => [
            ...prev,
            {
                ...transaction,
                _id: Date.now()
            }
        ]);
    }
    function deleteTransaction(id) {

        setTransactions(prev =>
            prev.filter(item => item.id !== id)
        );

    }
    const value = {
        transactions,
        addTransaction,
        deleteTransaction
    };

    useEffect(() => {
        try {
            localStorage.setItem(
                "transactions",
                JSON.stringify(transactions)
            );
        }
        catch (error) {
            console.log("Error loading transactions", error);
            return [];
        }
    }, [transactions]);


    return (<TransactionContext.Provider value={value}>
        {children}
    </TransactionContext.Provider>);


}