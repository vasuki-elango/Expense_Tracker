import React, { useState } from 'react'
import { Input } from '../../components/inputs/Input'
import { EmojiPickerPop } from '../EmojiPickerPop';

export const AddIncomeForm = ({ AddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (e) => setIncome({ ...income, [e.target.name]: e.target.value })
    const handleIcon = (url) => {
        setIncome({ ...income, icon: url })
    }
    return (
        <div className=''>

            <EmojiPickerPop
                icon={income.icon}
                onSelect={handleIcon}
            />

            <Input
                label="Income Source"
                type="text"
                placeholder="Freelance,Salary,etc..."
                name="source"
                onChange={handleChange}
                value={income.source}
            />
            <Input
                label="Amount"
                type="number"
                placeholder="$12000"
                name="amount"
                value={income.amount}
                onChange={handleChange}
            />
            <Input
                label="Date"
                type="date"
                placeholder=""
                name="date"
                value={income.date}
                onChange={handleChange}
            />

            <div className='flex justify-end mt-6'>
                <button type='button' className='add-btn' onClick={() => AddIncome(income)}>
                    Add Income
                </button>
            </div>
        </div>
    )
}
