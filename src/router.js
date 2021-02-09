const { Router } = require('express');
const cors = require('cors');

const validateParams = require('./middlewares/validate-params');
const transformFromUrl = require('./routes/transform-from-url');
const transformFromUpload = require('./routes/transform-from-upload');

const router = Router();

router.use(cors());
router.use(validateParams);

router.get('/', transformFromUrl);
router.post('/', transformFromUpload);

module.exports = router;