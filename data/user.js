const mongodb = require("mongodb");
const mongoCollections = require('../config/mongoCollections');
const userData = mongoCollections.user_Registration;
const passwordhash=require('password-hash')

//Async function to get a particular user
async function getUser(id){

    if (!id) throw 'You must provide an id to search for';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }   
    const usercollection= await userData();
    const user= await usercollection.findOne({_id:obj_Id});
    if (user === null) throw 'No user with that id exists';
    
    return user;
}



//Async function to create an user account for dream high
async function newUser (username, password, firstName, lastName, email){
    
    if(!username) throw "username is undefined";
    if(typeof username!="string") throw "username is not of type string";
    if(username.length<6) throw "username should be of length 6 or more";

    if(!password) throw "password is undefined";
    if(typeof password!="string") throw "password is not of type string";
    if(password.length<8) throw "password should be of length 10";
    
    let hashedpassword=passwordhash.generate(password);

    if(!firstName) throw `Please provide your first name`;
    if(typeof firstName!="string") throw "firstname is not of type string";
    
    if(!lastName) throw `Please provide your last name`;
    if(typeof lastName!="string") throw "lastname is not of type string";

    if(!email) throw "Please provide your Email Id";
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(typeof email!= "string") throw "Email id is not type string"

    if(!email.match(emailformat)) throw "Please provide a valid email id";

    const usercollection= await userData();

    const newuser = {
        username: username,
        lowerusername:username.toLowerCase(),
        password: hashedpassword,
        firstName: firstName,
        lastName: lastName,
        email: email,
        loweremail: email.toLowerCase()
    }
   
    const user_username= await usercollection.findOne({lowerusername:username.toLowerCase()});
    const user_email= await usercollection.findOne({loweremail:email.toLowerCase()});

    if(user_username) throw `Username already exists`;
    if(user_email) throw `User with this Emailid already exists`;

     //Inserting the new user details into the database collection
     const insertInfo = await usercollection.insertOne(newuser);
     if (insertInfo.insertedCount === 0) throw 'Could not create user account';
     let status = "User Account created successfully";
     return status;

}

//Function to validate user login
async function userValidation(username, password){   
    if(!username) throw `Please provide the username`;
    if(!typeof username !=="string") throw `Username should be of type string`;

    if(!password) throw `Please provide the password`;
    if(!typeof password !=="string") throw `Password should be of type string`;

    const usercollection= await userData();
    const user= await usercollection.findOne({username:username})
    if(!user){
        throw "Incorrect Username/password entered"
    }
    if(passwordhash.verify(password,user.password)){
        return user
    }
    else{
        throw "Incorrect Username/password entered"
    }
     
}


module.exports = {
    newUser,
    getUser,
    userValidation
};
