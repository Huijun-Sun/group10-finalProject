const express = require('express');
const router = express.Router();

const pageScripts =  [{script: "/public/js/guidesPage.js"}];


router.get('/', async (req, res) => {
  //  console.log(!req.session.isloggedin);
	res.render("guidesPage", {
        heading: "Guides",
        subHeading: "All you need to know, in one place.",
        showSearch: true,
        loggedOut: !req.session.isloggedin,
        scripts: pageScripts,isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,
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
