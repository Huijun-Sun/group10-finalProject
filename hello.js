/*let date= new Date();
let date2= new Date();
console.log(date.getTime());
console.log(date.toDateString());
console.log(date.toUTCString());
console.log(date.getHours());
date2.setHours(date.getHours()+1);
console.log(date.getDate().toString());

console.log(date2.getHours());
console.log(date2.getTime());*/
let date= new Date();
let date2= new Date();
let date3=new Date();
date2.setHours(date.getHours()+1);
date3.setHours(date.getHours()-3);
var ary=[
    {
        name:"1",
        date:date.getTime().toString()
    },
    {
        name:"2",
        date:date2.getTime().toString()
    },
    {
        name:"zhangsan",
        date:date3.getTime().toString()
    }
];

var points = ['a', 'c', 'e', 'abd', 'aa', 'adada'];
points.sort(function(a, b){return a-b}); 

//points.sort();
//console.log(points);
//console.log(ary);

ary.sort();
function compare(property){
    return function(obj1,obj2){
        var val1=obj1[property];
        var val2=obj2[property];
        return val2-val1;
    }
}
ary.sort(compare("date"));
console.log(ary);
ary.reverse();
console.log(ary)
/*
let fakeDate=new Date(date3.getTime());
console.log(date3);
console.log(fakeDate);
console.log(fakeDate.getMonth().toString());
console.log(fakeDate.getDate().toString());
console.log(fakeDate.getHours());
console.log(fakeDate.getMinutes());

fakeDate=new Date(date);
console.log(date.toUTCString());
console.log(fakeDate);
console.log(fakeDate.getMonth().toString());
console.log(fakeDate.getDate().toString());
console.log(fakeDate.getHours());
console.log(fakeDate.getMinutes());

let dif=new Date().getTimezoneOffset();

console.log("hello")
console.log(dif);
console.log((date3-date)/(60*1000));

date.setHours(date.getHours()+7);
var temp=date.toLocaleDateString();
console.log(date);
console.log(temp);

console.log(date.getTime().toString());
let tempDate=new Date(parseInt(date.getTime().toString()));
console.log(tempDate);
console.log(tempDate.getFullYear());
let start_date=new Date();
start_date.setDate(start_date.getDate()-3);
start_date.setMonth(start_date.getMonth()+5);
console.log("hello 111")
let str=start_date.getFullYear()+"-"+ (start_date.getMonth()<9?("0"+(start_date.getMonth()+1)):(start_date.getMonth()+1)) + "-"+(start_date.getDate()<10?"0"+start_date.getDate():start_date.getDate());
console.log(str);
console.log(Math.ceil(4141/24));*/


let a="abc";
let b=parseInt(a);
console.log(b);
if(!b&&b<0)
{
    console.log("a");
}
else{
    console.log("b");
}

let arrry=new Array();
arrry.push("1");
arrry.push("1");
console.log(typeof(arrry));