const expense = require('../models/ExpenseModel');
const mongoose = require('mongoose')
const xlsx = require('xlsx')

// addIncome
const addExpense = async (req, res) => {
    const userId = req.user.id
    const { icon, category, amount, date } = req.body;

    if (!category || !amount) {
        return res.status(400).json({ message: 'All fields required' });
    }

    try {
        const newExpense = new expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })

        await newExpense.save()

        res.status(201).json({
            message: 'Expense added successfully',
        });

    }
    catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }

}

// getIncome
const getExpense = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    try {
        const expenses = await expense.find({ userId: userId }).sort({ date: -1 })

        res.status(200).json(
            expenses
        )
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }

}

// deleteIncome
const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        await expense.findByIdAndDelete(expenseId)

        res.status(200).json({
            message: 'Expense deleted successfully',
        });

    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }

}

// downloadExpensefile
const downloadExpensefile = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenseData = await expense.find({ userId }).sort({ date: -1 })

        const data = expenseData.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb,'expense_details.xlsx')
        res.download('expense_details.xlsx')

    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpensefile
}