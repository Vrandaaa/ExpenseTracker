import React from 'react'
import NavBar from '../../components/NavBar'
import './Home.css'
import Card from '../../components/Card'
import TransactionForm from '../../components/TransactionForm'
import ActionCard from '../../components/ActionCard'
import { useState, useEffect, useContext } from 'react'
import TransactionCard from '../../components/TransactionCard'
import { TransactionContext } from '../../Context/TransactionContext'
import { useFinanceStats } from '../../hooks/useFinanceStats';
import DashboardPieChart from '../../components/charts/DashboardPieChart'
import { FaWallet } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import IncomeExpenseBarChart from '../../components/charts/IncomeExpenseBarChart'

const Home = () => {
  const [showForm, setShowForm] = useState(false)
  const { transactions } = useContext(TransactionContext);
  function addTransactionHandler() {
    setShowForm(prev => !prev)
  }
  const { incomeAmount, expenseAmount, balance, savings } = useFinanceStats();


  return (
    <div className='homeContainer'>
      <NavBar />
      <div className='contentSide'>
        <p>Welcome back , <span className='userName'>Vranda!</span></p>
        <div className='cardsContainer'>
          <Card title="Total Balance" amount={balance} path="/home" icon={<FaWallet size={25}/>}/>
          <Card title="Expense" amount={expenseAmount} path="/expense" icon={<FaCreditCard  size={25}/>}/>
          <Card title="Income" amount={incomeAmount} path="/income" icon={<FaMoneyBillWave  size={25}/>}/>
        </div>
        <div className='space'>
          <ActionCard
            title="Track your finances"
            subtitle="Add and manage your transactions easily"
            btnText="+ Add Transaction"
            onClick={addTransactionHandler}
          />
          {showForm && <TransactionForm />}
        </div>
        <div className='gridLayout'>
          <div className="transactionsSection">
            <TransactionCard
              title="Recent Transaction"
              data={transactions}
            />
          </div>

          <div className="chartSection">
            <DashboardPieChart />
          </div>
        </div>
        <IncomeExpenseBarChart/>
      </div>

    </div>
  )
}

export default Home