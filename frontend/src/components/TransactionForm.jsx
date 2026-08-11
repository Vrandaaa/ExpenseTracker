import React from 'react'
import './TransactionForm.css'
import { useState, useContext } from 'react';
import { TransactionContext } from '../Context/TransactionContext';
import EmojiPicker from "emoji-picker-react";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TransactionForm = ({ fixedType = "" }) => {
    const today = new Date().toISOString().split("T")[0];
    const [showForm, setShowForm] = useState(true)
    const [emoji, setEmoji] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { addTransaction } = useContext(TransactionContext);
    function closeBtnHandler() {
        setShowForm(!showForm)
    }

    const [formData, setFormData] = useState({
        icon: "",
        title: "",
        amount: Number(),
        type: fixedType,
        // category: "",
        date: ""
    });

    function validateForm() {

        if (!formData.icon) {
            toast.error("Select transaction icon")
            return false;
        }

        if (!formData.title.trim()) {
            toast.error("Enter title")
            return false;
        }

        if (!formData.amount) {
            toast.error("Enter amount");
            return false;
        }

        // only digits allowed
        const amountRegex = /^\d+$/;

        if (!amountRegex.test(formData.amount)) {
            toast.error("Amount must contain only digits")
            return false;
        }

        // cannot be 0 or negative
        if (Number(formData.amount) <= 0) {
            toast.error("Amount must be greater than 0")
            return false;
        }

        if (!formData.type.trim()) {
            toast.error("Select transaction type")
            return false;
        }

        if (!formData.date) {
            toast.error("Select date");
            return false;
        }

        return true;
    }

    function handleChange(event) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]:
                event.target.name === 'amount'
                    ? Number(event.target.value)
                    : event.target.value

        }));
    }

    function handleEmojiClick(emojiData) {
        setEmoji(emojiData.emoji);

        setFormData(prev => ({
            ...prev,
            icon: emojiData.emoji
        }));

        setShowEmojiPicker(false);
    }

    function formSubmitHandler(e) {
        e.preventDefault();

        const rel = validateForm();

        if (rel) {
            try {
                addTransaction(formData);
                toast.success("Transaction added");
                // clear form
                setFormData({
                    icon: "",
                    title: "",
                    amount: "",
                    type: fixedType,
                    // category: "",
                    date: ""
                });
                setEmoji(null);
            }

            catch {
                toast.error("there is some error sorry");
                console.log(formData);
            }

        } else {
            toast.error("Please fill the form correctly");
        }
    }

    return (

        <div className={showForm ? 'modalOverlay' : 'hide'}>

            <div className='transactionCard'>

                <button className='closeBtn' onClick={closeBtnHandler}>✕</button>

                <h2>Add Transaction</h2>

                <form className='transactionForm'>

                    <label>Transaction Icon</label>
                    <div className='emojiSelector'>
                        <button type='button' name='icon' className='emojiBtn' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{emoji}</button>
                        {showEmojiPicker && (
                            <div className='pickerContainer'>
                                <EmojiPicker
                                    onEmojiClick={handleEmojiClick}
                                />
                            </div>
                        )}
                    </div>

                    <label>Title</label>
                    <input name='title' type='text' placeholder='Enter title' onChange={handleChange} value={formData.title} />

                    <label>Amount</label>
                    <input type='text' name='amount' placeholder='Enter amount' onChange={handleChange} value={formData.amount} />

                    {!fixedType && (

                        <>
                            <label>Type</label>

                            <select name='type' value={formData.type} onChange={handleChange}>
                                <option value="">Select Type</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </>

                    )}

                    {/* <label>Category</label>
                    <input type='text' name='category' placeholder='Food / Shopping / Salary' onChange={handleChange} value={formData.category} /> */}

                    <label>Date</label>
                    <input type='date' name='date' max={today} onChange={handleChange} value={formData.date} />

                    <button className='addBtn' type='submit' onClick={formSubmitHandler}>
                        Add Transaction
                    </button>

                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    toastClassName="customToast"
                />
            </div>

        </div >
    )
}

export default TransactionForm