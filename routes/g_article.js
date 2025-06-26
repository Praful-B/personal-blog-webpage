const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:id', function(req, res) {
    const articleId = req.params.id;
    const articlesDir = path.join(__dirname, '..', 'public', 'uploads', 'articles');
    const articlePath = path.join(articlesDir, `${articleId}.json`);

    fs.readFile(articlePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(404).send('Article not found');
        }
        const article = JSON.parse(data);
        res.render('g_article', { article_title: article.title, article_date: article.date, article_body: article.body });
    });
});

module.exports = router;