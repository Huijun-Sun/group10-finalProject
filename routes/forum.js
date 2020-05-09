const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	res.render("forum_page", {
        // heading: "Finding a college should be easy.",

    });
});

module.exports = router;
