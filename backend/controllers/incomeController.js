const income = require('../models/IncomeModel');
const mongoose = require('mongoose')
const xlsx = require('xlsx')

// addIncome
const addIncome = async (req, res) => {
    const userId = req.user.id
    const { icon, source, amount, date } = req.body;

    if ( !source || !amount ) {
        return res.status(400).json({ message: 'All fields required' });
    }

    try {
        const newIncome = new income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save()

        res.status(201).json({
            message: 'Income added successfully',
        });

    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' ,error: err.message });
    }

}

// getIncome
const getIncome = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    
    try{
        const incomes = await income.find({userId:userId}).sort({date:-1})
        res.status(200).json(incomes)
    }
    catch(err){
        return res.status(500).json({ message: 'Server error' });
    }
}

// deleteIncome
const deleteIncome = async (req, res) => {
    try{
        const incomeId = req.params.id;

        await income.findByIdAndDelete(incomeId)

        if(!incomeId){
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({
            message: 'Income deleted successfully',
        });

    }
    catch(err){
        return res.status(500).json({ message: 'Server error' });
    }

}


const downloadIncomefile = async (req, res) => {
    const userId = req.user.id;
    try{
        const incomeData = await income.find({userId}).sort({date:-1})

        const data = incomeData.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb,ws,"Income")
        xlsx.writeFile(wb,'income_details.xlsx')
        res.download('income_details.xlsx')
    }
    catch(err){
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    addIncome,
    getIncome,
    deleteIncome,
    downloadIncomefile
}