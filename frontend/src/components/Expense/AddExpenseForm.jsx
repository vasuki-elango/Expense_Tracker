import React, { useState } from 'react'
import { Input } from '../inputs/Input'
import { EmojiPickerPop } from '../EmojiPickerPop'

export const AddExpenseForm = ({ AddExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value })
    const handleIcon = (url) => {
        setExpense({ ...expense, icon: url })
    }
    
    return (
        <div className=''>

            <EmojiPickerPop
                icon={expense.icon}
                onSelect={handleIcon}
            />

            <Input
                label="Expense Source"
                type="text"
                placeholder="Food,Petrol,etc..."
                name="category"
                onChange={handleChange}
                value={expense.category}
            />
            <Input
                label="Amount"
                type="number"
                placeholder="$12000"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
            <Input
                label="Date"
                type="date"
                placeholder=""
                name="date"
                value={expense.date}
                onChange={handleChange}
            />

            <div className='flex justify-end mt-6'>
                <button type='button' className='add-btn' onClick={() => AddExpense(expense)}>
                    Add Expense
                </button>
            </div>
        </div>
    )
}
