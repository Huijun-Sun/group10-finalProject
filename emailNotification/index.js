const universities = require("../data/universities");
const userdata=require('../data/user');
const userprofile=require('../data/userprofile');
async function main1() {
try
{
    let mail=[];
    let newobj={
       
        intuniv: '',
        email: ''
    };
    userinfo=await userprofile.getAllUsersProfile();
    userinfo.forEach(async element => {
        let userid=element.userid;
        element.int_app_university.forEach(async element1 => {
        intuniv=element1.uniName ;
        
        uid=await userdata.getUser(userid);
        email=uid.email;
        
        newobj={
            email: email,
            intuniv: intuniv
    
        };
        
    deadline = await universities.getDeadline(newobj.intuniv,null,null);
    month=deadline[0].deadline.getMonth();
    day=deadline[0].deadline.getDate();
    if (month==(new Date()).getMonth())
    {
    if(day==((new Date()).getDate()+1) || day==((new Date()).getDate())+7)
    {
    const {sendMail} = require('./mailer');
    console.log('sending email...');
    sendMail(newobj.email);
    console.log('email sent ✓');
    }
    }
        
    });
    
    });
}
catch(e)
{
    throw(e);

}}


async function main2()
{
   await main1();
}
main2();