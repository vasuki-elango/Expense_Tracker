const income = require('../models/IncomeModel');
const expense = require('../models/ExpenseModel');
const mongoose = require('mongoose')

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch total income
        const totalIncome = await income.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Fetch total expenses
        const totalExpenses = await expense.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // last 60days income
        const last60DaysIncome = await income.find({
            userId,
            date: { $gte: new Date() - 60 * 24 * 60 * 60 * 1000 }
        }).sort({ date: -1 });

        // last 60days expense
        const last60daysExpense = await expense.find({
            userId,
            date: { $gte: new Date() - 60 * 24 * 60 * 60 * 1000 }
        }).sort({ date: -1 });

        // last 30days income
        const last30DaysIncome = await income.find({
            userId,
            date: { $gte: new Date() - 30 * 24 * 60 * 60 * 1000 }
        }).sort({ date: -1 });

        // last 30days expense
        const last30daysExpense = await expense.find({
            userId,
            date: { $gte: new Date() - 30 * 24 * 60 * 60 * 1000 }
        }).sort({ date: -1 });

        // trancation history
        const transactionincome = last60DaysIncome.reduce((acc, reduce) => {
            return acc + reduce.amount;
        }, 0)

        const transactionexpense = last60daysExpense.reduce((acc, reduce) => {
            return acc + reduce.amount;
        }, 0)

        // last 5days income & expense
        const last5DaysIncome = await income.find({
            userId,
            date: { $gte: new Date() - 5 * 24 * 60 * 60 * 1000 }
        }).sort({ date: -1 });
        const last5DaysExpense = await expense.find({
            userId,
            date: { $gte: new Date() - 5 * 24 * 60 * 60 * 1000 }
        }).sort({ date: -1 });

        const RecentTranscation =[...last30DaysIncome,...last30daysExpense]

        res.status(200).json({
            totalamount: ((totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0)),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpenses[0]?.total || 0,
            last30Daysexpense: {
                amount: transactionexpense,
                transaction: last30daysExpense
            },
            last30Daysincome: {
                amount: transactionincome,
                transaction: last30DaysIncome
            },
            last60daysExpense: {
                amount: transactionincome,
                transaction: last60daysExpense
            },
            last60daysIncome: {
                amount: transactionincome,
                transaction: last60DaysIncome
            },
            RecentTranscation:RecentTranscation
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
