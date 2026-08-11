import React from 'react'
import './ActionCard.css'

const ActionCard = ({title, subtitle, btnText, onClick}) => {
  return (
    <div className='actionCard'>
        
        <div className='actionLeft'>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>

        <button
            className='actionBtn'
            onClick={onClick}
        >
            {btnText}
        </button>

    </div>
  )
}

export default ActionCard