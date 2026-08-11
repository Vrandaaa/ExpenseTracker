import { useContext} from "react";
import { TransactionContext } from "../Context/TransactionContext";
export function useFinanceStats(){
    const {transactions} = useContext(TransactionContext);
    const incomeTransacions = transactions.filter(item => item.type === 'Income')
    const expenseTransacions = transactions.filter(item => item.type === 'Expense')
    let expenseAmount = 0
    let incomeAmount = 0
    for(let i = 0 ; i < incomeTransacions.length ; i++){
        incomeAmount += Number(incomeTransacions[i].amount)
    }

    for(let i = 0 ; i < expenseTransacions.length ; i++){
        expenseAmount += Number(expenseTransacions[i].amount)
    }

    let balance = (incomeAmount - expenseAmount);
    return {incomeAmount , expenseAmount , balance};
}