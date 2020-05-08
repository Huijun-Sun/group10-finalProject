const express = require('express');
const router = express.Router();

const scripts = [{ script: "/public/js/events_page.js" }]

router.get('/', async (req, res) => {
	res.render("events_page", {
        heading: "Events",
        sub_heading: "Get involved, and learn more about your dream college!",
        scripts: scripts,
    });
});

module.exports = router;
