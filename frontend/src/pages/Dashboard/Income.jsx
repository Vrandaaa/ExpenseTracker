import React from 'react'
import { useState, useContext } from 'react'
import NavBar from '../../components/NavBar'
import ActionCard from '../../components/ActionCard'
import TransactionForm from '../../components/TransactionForm'
import TransactionCard from '../../components/TransactionCard'
import './Income.css'
import { TransactionContext } from '../../Context/TransactionContext'
import Card from '../../components/Card'
import { FaMoneyBillWave } from "react-icons/fa";
import { useFinanceStats } from '../../hooks/useFinanceStats'
import IncomeTrend from '../../components/charts/IncomeTrend'
// import IncomeCategoryChart from '../../../../deletedFiles/IncomeCategoryChart'

const Income = () => {
  const [showForm, setShowForm] = useState(false)
  function addTransactionHandler() {
    setShowForm(prev => !prev)
  }
  const { transactions } = useContext(TransactionContext);
  const incomeTransacions = transactions.filter(item => item.type === 'Income');
  const { incomeAmount, expenseAmount, balance, savings } = useFinanceStats();
  return (
    <div className='incomeConatiner'>
      <NavBar />
      <div className='contentSide'>
        <div className='header'>
          <Card title="Income" amount={incomeAmount} path="/income" icon={<FaMoneyBillWave size={25} />} />

          <ActionCard
            title="Manage Income"
            subtitle="Add salary, freelance and other earnings"
            btnText="+ Add Income"
            onClick={addTransactionHandler}
          />
          {showForm && <TransactionForm fixedType="Income" />}
        </div>
        <IncomeTrend />
        <div className='transactionAndChart'>
          <div className='transactionSection'>
            <TransactionCard
              title={'Recent Incomes'}
              data={incomeTransacions}
              grid={true}
            />
          </div>
        </div>

        
      </div>

    </div>
  )
}

export default Income