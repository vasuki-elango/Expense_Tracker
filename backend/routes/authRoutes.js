const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/imageMiddelware')
const {
    registerUser,
    logUser,
    getUserInfo
} = require('../controllers/authController');

router.post('/signup',registerUser)
router.post('/login',logUser)
router.get('/getuser',protect,getUserInfo)

router.post('/upload-image',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"})
    }
    const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({imageURL})
})

module.exports = router;