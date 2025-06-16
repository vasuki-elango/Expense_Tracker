const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addIncome,
    getIncome,
    deleteIncome,
    downloadIncomefile
} = require('../controllers/incomeController')

router.post('/add',protect, addIncome);
router.get('/get', protect,getIncome);
router.delete('/delete/:id',protect, deleteIncome);
router.get('/download', protect,downloadIncomefile);

module.exports = router;