const universities = require("../data/universities");
async function main1() {
try
{

deadline = await universities.getDeadline("Stevens Institute of Technology","Computer Science","Fall");
month=deadline[0].deadline.getMonth();
day=deadline[0].deadline.getDate();
if (month==(new Date()).getMonth())
{
if(day+1==(new Date()).getDate() || day+7==(new Date()).getDate())
{
const {sendMail} = require('./mailer');
console.log('sending email...');
sendMail(tomailid);
console.log('email sent ✓');
}
}
}
catch(e)
{
    throw(e);

}}
//main1();