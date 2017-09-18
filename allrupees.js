////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//             -------------inputs--------------                              //
//                                                                            //
//             hard coded:                 target,user limit                  //
//             command line arguments:     coins                              //
//                                                                            //
//             set target rupees to target                                    //
//             set userlimit(how many bids user can do in 20hrs)              //
//             give coins(amount of coins required for each bid)              //
//                                                                            //
//             --------------example--------------------                      //
//                                                                            //
//             node allrupees 3                                               //
//                                                                            //
//             if target is '25' and userlimit is 80                          //
//             program will give json file of all possible amounts            //
//             less than 25 shuffeled and organised into groups of 80numbers  //
//             each                                                           //
//                                                                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

var fs = require('fs');

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//removed all multiples of 5(0.5,0.10,0.10....)as they are more common.so that we can eliminate 20
//numbers for each rupee we target
var arr = [0.01, 0.02, 0.03, 0.04, 0.06, 0.07, 0.08, 0.09, 0.11, 0.12, 0.13, 0.14, 0.16, 0.17, 0.18, 0.19, 0.21, 0.22, 0.23, 0.24, 0.26, 0.27, 0.28, 0.29, 0.31, 0.32, 0.33, 0.34, 0.36, 0.37, 0.38, 0.39, 0.41, 0.42, 0.43, 0.44, 0.46, 0.47, 0.48, 0.49, 0.51, 0.52, 0.53, 0.54, 0.56, 0.57, 0.58, 0.59, 0.61, 0.62, 0.63, 0.64, 0.66, 0.67, 0.68, 0.69, 0.71, 0.72, 0.73, 0.74, 0.76, 0.77, 0.78, 0.79, 0.81, 0.82, 0.83, 0.84, 0.86, 0.87, 0.88, 0.89, 0.91, 0.92, 0.93, 0.94, 0.96, 0.97, 0.98, 0.99];
var allrupees = [];

var target = 150;                    //rupees to target
var userlimit = 120;                  //numbers of bids for user
var coins=process.argv.slice(2);    //number of coins for bid

var filename = coins+'c.json';

for (i = 120.00; i <= target; i++) {
    arr = shuffle(arr);
    var rupee = arr.map(function (x) {
        var num = x + i;
        // console.log(x + "+" + i + " = " + num.toFixed(2));
        return num.toFixed(2);
    });

    allrupees=allrupees.concat(rupee);

}
allrupees = shuffle(allrupees);
// i = 1;
var tempmoney=[];
while (allrupees.length) {
    var rupee=allrupees.splice(0,userlimit);
    tempmoney.push(rupee);
    // i++;
}
var str = JSON.stringify(tempmoney, null, 4);
    
    fs.appendFile(filename, str, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('File written!');
        }
    });