const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}` );
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = ['image/jpeg','image/jpg','image/png'];
    
    if (filetypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        cb('Error: File upload only supports the following filetypes - ' + filetypes);
    }
}

const upload =  multer({storage,fileFilter})

module.exports = upload