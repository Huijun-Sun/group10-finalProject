const express = require('express');
const router = express.Router();

const pageScripts =  [{script: "/public/js/introPage.js"}];


router.get('/', async (req, res) => {
	res.render("introPage", {
        heading: "Finding a college should be easy.",
        showSearch: true,
        showRegBanner: true,
        scripts: pageScripts,
    });
});

module.exports = router;
