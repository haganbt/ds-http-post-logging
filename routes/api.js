var express = require('express');
var router = express.Router();
var fs = require("fs");

// synchronous - blocking
router.post('/data', function(req, res) {

    console.log('----------------------');
    console.log("Timestamp: "+timeStamp());
    console.log("Remaining Bytes: " +  bytesToSize(req.headers['x-datasift-remaining-bytes']));
    console.log("Content Length: " + bytesToSize(req.headers['content-length']));
    console.log("Subscription Id: " + bytesToSize(req.headers['X-Datasift-Id']));
    console.log("Encoding: " + req.headers['content-encoding']);
    console.log("Host: " + req.headers['host']);

    var subId = req.headers['x-datasift-id'] || 'validate';
    fs.writeFileSync('./data/' + subId + '.' + req.headers['content-encoding'], req.rawBody);

    res.json({"success": true})
    next();
});

module.exports = router;

/**
 * bytesToSize
 * @type {qfloat}
 */
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 */
function timeStamp() {
// Create a date object with the current time
    var now = new Date();

// Create an array with the current month, day and time
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
    time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
    for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }

// Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}
