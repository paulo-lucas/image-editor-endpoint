const { Router } = require('express');
const cors = require('cors');

const validateParams = require('./middlewares/validate-params');
const editFromUrl = require('./routes/edit-from-url');
const editFromUpload = require('./routes/edit-from-upload');

const router = Router();

router.use(cors());
router.use(validateParams);

router.get('/', editFromUrl);
router.post('/', editFromUpload);

module.exports = router;