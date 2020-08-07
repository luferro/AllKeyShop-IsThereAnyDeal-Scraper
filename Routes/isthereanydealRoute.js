const express = require("express");
const router = express.Router();
const isthereanydealController = require('../Controllers/isthereanydealController');
    
router.route('/search/:title').get(isthereanydealController.searchGames);
router.route('/:title').get(isthereanydealController.getGame);

module.exports = router;