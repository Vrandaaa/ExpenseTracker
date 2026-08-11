import React, { useState, useContext } from 'react'
import './TransactionRecords.css'
import { FaArrowTrendUp, FaArrowTrendDown, FaTrash } from "react-icons/fa6";
import { TransactionContext } from '../Context/TransactionContext';
import DeleteConfirmation from './DeleteConfirmation';


const TransactionRecords = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { deleteTransaction } = useContext(TransactionContext)

    function deleteHandler() {
        deleteTransaction(props.id);
        setShowDeleteModal(false);
    }
    function getSuffix(day) {
        if (day > 3 && day < 21) return "th";

        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
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
    const transactionDate = new Date(props.date);
    const day = transactionDate.getDate();
    const month = months[transactionDate.getMonth()];
    const year = transactionDate.getFullYear();
    const formattedDate = `${day}${getSuffix(day)} ${month}, ${year}`;
    return (
        <div>
            <div className='transactionData'>
                <div><div className='icon'>{props.icon}</div></div>
                <div className='details'>
                    <div className='titleDate'>
                        <span>{props.title}</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className={`amount ${props.type === "Income" ? "income" : "expense"}`}><span>{props.type === 'Income' ? <FaArrowTrendUp /> : <FaArrowTrendDown />}</span><span>₹{props.amount}</span></div>
                    <div className='delete' onClick={() => setShowDeleteModal(true)}><FaTrash /></div>
                    <DeleteConfirmation
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={deleteHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default TransactionRecords