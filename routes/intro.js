const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	res.render("introPage", {
        heading: "Finding a college should be easy.",
        showSearch: true,
        showRegBanner: true,
    });
});

module.exports = router;
