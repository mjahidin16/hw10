const express = require('express');
const router = express.Router();
const multer = require('multer'); // Tambahkan require untuk multer
const MovieController = require('../controller/movie_controller');
const auth = require('../middleware/auth');

// Konfigurasi multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.toLowerCase().split(" ").join("-"));
    }
});

const upload = multer({ storage: storage }); // Inisialisasi multer dengan konfigurasi storage

router.get('/', MovieController.getSemua);
router.get('/:id', MovieController.getOne);
router.post('/', auth, MovieController.create);
router.put('/:id', auth, MovieController.update);
router.post('/:id/upload',auth, upload.single('photo'), MovieController.uploadImage);
router.delete('/:id', auth, MovieController.delete);

// Gunakan middleware Multer di endpoint upload gambar


module.exports = router;
