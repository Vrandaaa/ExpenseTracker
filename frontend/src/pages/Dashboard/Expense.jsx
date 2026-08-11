import React from 'react'
import NavBar from '../../components/NavBar'
import { useState, useContext } from 'react'
import ActionCard from '../../components/ActionCard'
import TransactionForm from '../../components/TransactionForm'
import TransactionCard from '../../components/TransactionCard'
import { TransactionContext } from '../../Context/TransactionContext'
import './Expense.css'
// import ExpenseCategoryChart from '../../../../deletedFiles/ExpenseCategoryChart'
import ExpenseTrend from '../../components/charts/ExpenseTrend'
import Card from '../../components/Card'
import { useFinanceStats } from '../../hooks/useFinanceStats'
import { FaCreditCard } from "react-icons/fa";


const Expense = () => {
  const [showForm, setShowForm] = useState(false)
  function addTransactionHandler() {
    setShowForm(prev => !prev)
  }
  const { transactions } = useContext(TransactionContext);
  const expenseTransacions = transactions.filter(item => item.type === 'Expense');
  const { incomeAmount, expenseAmount, balance, savings } = useFinanceStats();

  return (
    <div className='expenseConatiner'>
      <NavBar />


      <div className='contentSide'>

        <div className='header'>
          <Card title="Expense" amount={expenseAmount} path="/expense" icon={< FaCreditCard size={25} />} />

          <ActionCard
            title="Manage Expenses"
            subtitle="Track spending and control your budget"
            btnText="+ Add Expense"
            onClick={addTransactionHandler}
          />

          {showForm && <TransactionForm fixedType="Expense" />}
        </div>
        <ExpenseTrend />
        <TransactionCard title={'Recent Expenses'} data={expenseTransacions} grid={true}/>
      </div>
      
    </div>
  )
}

export default Expense