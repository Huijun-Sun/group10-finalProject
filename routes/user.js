const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user;
const xss=require("XSS");
const pageScripts =  [{script: "/public/js/introPage.js"}];

//Async function to check if a user is logged in
router.get("/userlogin",async function(req,res){
    if(req.session.isloggedin===true){
        //Main Page of dream high
        res.redirect({isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid})
        return;
        
    }
    //sign up page i.e. user
    res.status(200).render({isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid});
    return;
});

//If a user is logged in, then opens the website - login page shouldn't be displayed   
router.get("/" ,async function(req,res){
 //  console.log(1)
    // if(req.session.isloggedin!==undefined && req.session.isloggedin==true){
    //     //redirect to main page of dream high
    //     res.redirect("/profile");
    //     return;
    // }

    res.render("authPage", {
      showSearch: false,
      loggedOut: !req.session.isloggedin,
      hideRegBanner: true,isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid
    });
    return;    
});



   //Async route function to get a particular user detail
   //Be careful:: The userdetails include hashed password too
   router.get("/profile/:id", async (req, res) => {
    try {
      const user = await userData.getUser(req.params.id);
      res.status(200).json(user);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  });


//Async function to create a userprofile
  router.post("/signup", async (req, res) => {
   
      try {
        const createdUser = await userData.newUser(xss(req.body.username), xss(req.body.password), xss(req.body.firstname),xss(req.body.lastname), xss(req.body.email));
        req.session.user=createdUser.username;
        req.session.AuthCookie = req.sessionID;
        req.session.isloggedin = true;
        req.session.userid=createdUser._id;
        req.session.userdata=createdUser;
        res.status(200).render("createUserProfile",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid});
      
      } catch (e) {
      
        res.render("introPage", {
          heading: "Finding a college should be easy.",
          showSearch: true,
          loggedOut: !req.session.isloggedin,
          scripts: pageScripts,
          regError: e,
        });
      }
  });

  router.post("/login", async (req, res)=>{
    let formData = req.body;
    try{
       
        let result = await userData.userValidation(xss(formData.username), xss(formData.password));
        req.session.user=result.username;
        req.session.AuthCookie = req.sessionID;
        req.session.isloggedin = true;
        req.session.userid=result._id;
        req.session.userdata=result;
        res.status(200).render("intropage",{isloggedin:req.session.isloggedin,userid: req.session.userid,username:req.session.user});

    }catch(e){
   
        res.render("authPage", {
          showSearch: false, 
          loginError: "Usename/Password is invalid" 
        });
    }
});

router.get("/logout", async (req, res) => {
 // console.log(req.session.isloggedin);
  //console.log('AuthCookie');
    //Deleting the Authcookie and informing the user of logout
    res.clearCookie('isloggedin');
    res.clearCookie('AuthCookie');
    req.session.destroy();
    //Logout Path
    res.redirect("/auth");
    
 //   console.log('AuthCookie');
});

     //Exporting the route module
     module.exports = router;