const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpensefile
} = require('../controllers/expenseController')

router.post('/add',protect, addExpense);
router.get('/get', protect,getExpense);
router.delete('/delete/:id',protect, deleteExpense);
router.get('/download', protect,downloadExpensefile);

module.exports = router;