const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user;

const pageScripts =  [{script: "/public/js/introPage.js"}];

//Async function to check if a user is logged in
router.get("/userlogin",async function(req,res){
    if(req.session.isloggedin===true){
        //Main Page of dream high
        res.redirect()
        return;
        
    }
    //sign up page i.e. user
    res.status(200).render();
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
    const userInfo = req.body;
   
  
    if (!userInfo) {
        res.status(400).json({error: 'You must provide data to to create user account'});
        return;
      }
      try {
        const createdUser = await userData.newUser(userInfo.username, userInfo.password, userInfo.firstname, userInfo.lastname, userInfo.email);
        res.redirect("/auth");
        // res.render("introPage", {
        //   heading: "Finding a college should be easy.",
        //   showSearch: true,
        //   loggedOut: !req.session.isloggedin,
        //   scripts: pageScripts,
        // });
      } catch (e) {
        console.log(e)
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
        //Checking the validity of login credentials
        console.log(`/login: user name: ${formData.username}`);
        let result = await userData.userValidation(formData.username, formData.password);
        console.log(result);
        if(result === "Success"){
            //req.session.users = curr_user;
            //Setting the AuthCookie
            req.session.AuthCookie = req.sessionID;
            //redirect to main page of dream high
            res.status(200).redirect();
        }
        else{
            //Redirect to login page 
            res.render("authPage", {
              showSearch: false, 
              loginError: "User not found" 
            });
        }    
    }catch(e){
      console.log(req.body);
      console.log(`/login: ${e}`);

      
        //When the user credentials are incorrect or does not exist
        res.render("authPage", {
          showSearch: false, 
          loginError: "Usename/Password is invalid" 
        });
    }
});

router.get("/logout", async (req, res) => {
    //Deleting the Authcookie and informing the user of logout
    res.clearCookie('AuthCookie');
    //Logout Path
    res.redirect("/auth")
});

     //Exporting the route module
     module.exports = router;