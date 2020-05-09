const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user;

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
   // console.log(1)
    if(req.session.isloggedin!==undefined && req.session.isloggedin==true){
        //redirect to main page of dream high
        res.redirect();
        return;
    }
});



   //Async route function to get a particular user detail
   //Be careful:: The userdetails include hashed password too
   router.get("/:id", async (req, res) => {
    try {
      const user = await userData.getUser(req.params.id);
      res.status(200).json(user);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  });


//Async function to create a userprofile
  router.post("/", async (req, res) => {
    const userInfo = req.body;
    
    if (!userInfo) {
        res.status(400).json({error: 'You must provide data to to create user account'});
        return;
      }
      try {
        const createdUser = await userData.newUser(userInfo.username, userInfo.password, userInfo.firstname, userInfo.lastname, userInfo.email);
        res.status(200).json(createdUser);
      } catch (e) {
        res.status(500).json({error: e});
      }
  });

  router.post("/login", async (req, res)=>{
    let formData = req.body;
    try{
        //Checking the validity of login credentials
        let result = await userData.userValidation(formData.username, formData.password);
        if(result === "Success"){
            //req.session.users = curr_user;
            //Setting the AuthCookie
            req.session.AuthCookie = req.sessionID;
            //redirect to main page of dream high
            res.status(200).redirect();
        }
        else{
            //Redirect to login page 
            res.render("Add login Page Path here" , {
                error: "User not found"
            })
        }    
    }catch(e){
        //When the user credentials are incorrect or does not exist
        res.status(401).render("Add login Page Path here" , {error: "Usename/Password is invalid" })
    }
});

router.get("/logout", async (req, res) => {
    //Deleting the Authcookie and informing the user of logout
    res.clearCookie('AuthCookie');
    //Logout Path
    res.render("Add logout path here" , {
        logout :" You have successfully logged out"
    })
});

     //Exporting the route module
     module.exports = router;