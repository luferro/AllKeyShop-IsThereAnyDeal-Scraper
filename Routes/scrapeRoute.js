const express = require("express");
const router = express.Router();
const scraperController = require('../Controllers/scraperController');
    
router.route('/:title').get(scraperController.getGame);
router.route('/top/:platform').get(scraperController.getTop);

module.exports = router;