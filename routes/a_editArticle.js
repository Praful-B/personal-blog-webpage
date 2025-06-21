const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('a_editArticle');
})


module.exports = router;