const express = require("express");
const router = express.Router();
const allkeyshopController = require('../Controllers/allkeyshopController');
    
router.route('/search/:title').get(allkeyshopController.searchGames);
router.route('/:title').get(allkeyshopController.getGame);
router.route('/top/:platform').get(allkeyshopController.getTop);

module.exports = router;