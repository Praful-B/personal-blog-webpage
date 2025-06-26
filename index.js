const express = require('express');
const path = require('path');
require('dotenv').config();



const a_home_route = require('./routes/a_home');
const a_newArticle_route = require('./routes/a_newArticle');
const a_editArticle_route = require('./routes/a_editArticle');

const g_home_route = require('./routes/g_home');
const g_article_route = require('./routes/g_article');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.use('/home', g_home_route);
app.use('/article', g_article_route);
app.use('/a_home', a_home_route);
app.use('/a_newArticle', a_newArticle_route);
app.use('/a_editArticle', a_editArticle_route);

app.get('/', (req, res) => {
   res.redirect('/home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
