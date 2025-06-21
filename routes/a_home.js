const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('a_home');
})


module.exports = router;