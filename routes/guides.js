const express = require('express');
const router = express.Router();

const pageScripts = [
    { script: "/public/js/guidesPage.js" },
    { script: "https://cdn.jsdelivr.net/npm/marked/marked.min.js" }
];


router.get('/', async (req, res) => {
    console.log(!req.session.isloggedin);
    res.render("guidesPage", {
        heading: "Guides",
        subHeading: "All you need to know, in one place.",
        showSearch: true,
        loggedOut: !req.session.isloggedin,
        scripts: pageScripts,
    });
});

// router.get('/admit', async (req, res) => {
// 	res.render("admitRejectPage", {
//         heading: "Admitttttt",
//         showSearch: false,
//         showRegBanner: true,
//         scripts: [],
//     });
// });

module.exports = router;
