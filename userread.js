var users=require('./users.json');
var user=users[10];
console.log(user.user);


var totbids=require('./1c.json');

for(totuser in totbids){
        var i=0;
        console.log(totbids[totuser][i]);
}