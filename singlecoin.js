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
var totbids = [0.01, 0.02, 0.03, 0.04, 0.06, 0.07, 0.08, 0.09, 0.11, 0.12, 0.13, 0.14, 0.16, 0.17, 0.18, 0.19, 0.21, 0.22, 0.23, 0.24, 0.26, 0.27, 0.28, 0.29, 0.31, 0.32, 0.33, 0.34, 0.36, 0.37, 0.38, 0.39, 0.41, 0.42, 0.43, 0.44, 0.46, 0.47, 0.48, 0.49, 0.51, 0.52, 0.53, 0.54, 0.56, 0.57, 0.58, 0.59, 0.61, 0.62, 0.63, 0.64, 0.66, 0.67, 0.68, 0.69, 0.71, 0.72, 0.73, 0.74, 0.76, 0.77, 0.78, 0.79, 0.81, 0.82, 0.83, 0.84, 0.86, 0.87, 0.88, 0.89, 0.91, 0.92, 0.93, 0.94, 0.96, 0.97, 0.98, 0.99];


var inputfield = '#container > div > div:nth-child(2) > div > div > div > div._3ooaa4 > div._1r-M-1 > div:nth-child('+(productnum+1)+') > div > div > div._34dlP7 > div > input';
var bidbutton = '#container > div > div:nth-child(2) > div > div > div > div._3ooaa4 > div._1r-M-1 > div:nth-child('+(productnum+1)+') > div > div > div._34dlP7 > div > button';

var i = user.lastbid;

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
                            .insert(inputfield, totbids[i])
                            .wait(2000)
                            .click(bidbutton)
                            .wait(5000)
                            .exists('button._2AkmmA._2Rr3iH')
                            .then(function (result) {
                                console.log("done bid "+(totbids[i])+" and exiting status " + result);
                                    i++;
                                if (result) {
                                    return nightmare.click('button._2AkmmA._2Rr3iH')
                                }
                            })
                })
                .then(function () {
                    // console.log("this is " + i + "th bid. so,no navigation")
                    // // console.log(nightmare);
                    return
                    nightmare
                        // .insert('input._2zwvf6[type="text"]', totbids[cnum][i])
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
        }, interval);
    })



    .then()
    .catch((error) => {
        console.error('bidding failed:', error);
    });