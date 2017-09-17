//////////////////////////////////////////////////////////////////////////
//                                                                      //
//             ------------inputs-----------                            //
//                                                                      //
//             commandline:                                             //
//             command line arguments:     cnum                         //
//                                                                      //
//             give cnum(user number to login)                          //
//                                                                      //
//             --------------example---------                           //
//                                                                      //
//             node start.js 1                                          //
//                                                                      //
//             logins with user1 navigate to biddings page and waits for//
//             u to click "enter contest" Button                        //
//                                                                      //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: true
});
var self = nightmare;
var users = require('./users.json');

var cnum = process.argv.slice(2);
cnum = cnum - 1;

var user = users[cnum];


console.log("attempting login with ( " + cnum + " ) account...")
console.log("------------user :" + user.user + "---------------")
nightmare
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto('https://www.flipkart.com/account/login?ret=/')
    .insert('input._2zrpKA[type="text"]', user.user)
    .insert('input._2zrpKA._3v41xv[type="password"]', user.pass)
    .click('button._2AkmmA._1LctnI._7UHT_c')
    .wait(2000)
    .goto('https://www.flipkart.com/bidandwin')
    .wait(550000)
    .end()
    .then()
    .catch((error) => {
        console.error('bidding failed:', error);
    });