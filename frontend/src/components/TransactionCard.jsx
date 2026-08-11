import React from 'react'
import './TransactionCard.css'
import TransactionRecords from './TransactionRecords'
import { useState } from 'react'
const TransactionCard = (props) => {

  const sortedTransactions = [...props.data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const [showAll, setShowAll] = useState(false);
  const visibleTransactions = showAll
    ? sortedTransactions
    : sortedTransactions.slice(0, 4);
  return (
    <div className={props.grid ? "card gridCard" : "card"}>
      <div className='heading'>
        <p>{props.title}</p>
        {
          props.data.length > 4 && (
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : 'Show All'}
            </button>
          )
        }
      </div>
      <div className={props.grid ? "transactionsGrid" : ""}>
        {
          props.data.length === 0 ? (
            <div className='empty'>
              <p>No transactions yet</p>
            </div>
          ) : (
            visibleTransactions.map((i) => (
              <TransactionRecords
                key={i.id}
                id={i.id}
                title={i.title}
                amount={i.amount}
                icon={i.icon}
                date={i.date}
                type={i.type}
              // category={i.category}
              />
            ))
          )
        }
      </div>

    </div>
  )
}

export default TransactionCard