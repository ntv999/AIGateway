const express = require('express');
const { getWineDescription } = require('../controllers/wineDescription');
const router = express.Router();

router.post('/wineDescription', getWineDescription);

module.exports = router;