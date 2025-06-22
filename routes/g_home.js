const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const articlesDir = 'public/uploads/articles';


// an async function that add the `file : filePath` to articleMap
async function getArticles() {
    try {
        let articlesMap = {};
        const files = await fs.promises.readdir(articlesDir);
        files.forEach(file => {
            articlesMap[file] = path.join(articlesDir, file);
        })
        return articlesMap; // when this fn is called without await it returns the [object  Promises] rather than the data call this fn with await to deal handle the data
    } catch (error) {
        console.error('Error reading articles directory:', error);
        return {};
    }
}

// TODO : after all the files are added to the map update the ejs to show the files as a clickable link
// TODO : when clicked on a article link .redirect to /article?=[-] or /article/[-]


/* the route handler is async because otherwise the getArticles() -> returns a promises(<pending>) object because the function has not yet completed execution
* to fix this the making route handler fn async makes it so that the function is suspended at `await getArticles()` till the fn is executed
* then the functions returns with actual data and the data is handled
* */
router.get('/', async function (req, res) {
    try {
        const artMap = await getArticles()
        const artMapSt = JSON.stringify(artMap, null, 4);
        res.render('g_home', {artMap: artMapSt});
    } catch (error) {
        console.error("Error in route handler", error);

    }
})



module.exports = router;