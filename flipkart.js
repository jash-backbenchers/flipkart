var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: true
});
var self = nightmare;
var users = require('./users.json');


var productnum = 1;
var coins =3;

var cnum = process.argv.slice(2);
cnum = cnum - 1;


var user = users[cnum];
var totbids = require('./' + coins + 'c.json');


var inputfield = '#container > div > div:nth-child(2) > div > div > div > div._3ooaa4 > div._1r-M-1 > div:nth-child('+(productnum+1)+') > div > div > div._34dlP7 > div > input';
var bidbutton = '#container > div > div:nth-child(2) > div > div > div > div._3ooaa4 > div._1r-M-1 > div:nth-child('+(productnum+1)+') > div > div > div._34dlP7 > div > button';

var i = user.lastbid;

console.log("attempting login with ( " + cnum + " ) account...")
console.log("------------user :" + user.user + "---------------")
nightmare
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto('https://www.flipkart.com/account/login?ret=/')
    .type('input._2zrpKA[type="text"]', user.user)
    .type('input._2zrpKA._3v41xv[type="password"]', user.pass)
    .click('button._2AkmmA._1LctnI._7UHT_c')
    .wait(2000)
    .goto('https://www.flipkart.com/bidandwin')
    .wait()

    .run(function () {
        console.log("login completed started waiting for coins( " + (coins * 5) + "-min )");
        var interval = 60000 * 5 * coins + 5000;
        //   if(nightmare.exists('button._2AkmmA._2rkQth._1eFTEo'))
        //     console.log(document.querySelector('button._2AkmmA._2rkQth._1eFTEo'));
        setInterval(function () {
            console.log("its been "+(5*coins)+"-min");
            return nightmare
                .exists('button._2AkmmA._2rkQth._1eFTEo')
                .then(function (result) {
                    console.log("coin available status: " + result);
                    if (result) {
                        return nightmare.click('button._2AkmmA._2rkQth._1eFTEo')
                    }
                })
                .then(function () {
                    console.log("collected coin and ready to bid");
                    return nightmare 
                            .type(inputfield, totbids[cnum][i])
                            .wait(2000)
                            .click(bidbutton)
                            .wait(5000)
                            .exists('button._2AkmmA._2Rr3iH')
                            .then(function (result) {
                                console.log("done bid "+(totbids[cnum][i])+" and exiting status " + result);
                                if (result) {
                                    i++;
                                    return nightmare.click('button._2AkmmA._2Rr3iH')
                                }
                            })
                })
                .then(function () {
                    // console.log("this is " + i + "th bid. so,no navigation")
                    // // console.log(nightmare);
                    return
                    nightmare
                        // .type('input._2zwvf6[type="text"]', totbids[cnum][i])
                        // .wait(2000)
                        // .click('button._2AkmmA._3zym7j._7UHT_c')
                        // .wait(5000)
                        // .exists('button._2AkmmA._2Rr3iH')
                        // .then(function (result) {
                        //     i++;
                        //     console.log("done bid and exiting status " + result);
                        //     if (result) {
                        //         return nightmare.click('button._2AkmmA._2Rr3iH')
                        //     }
                        // })
                        .end()
                })
        }, 10000);
    })



    .then()
    .catch((error) => {
        console.error('bidding failed:', error);
    });