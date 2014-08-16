var express = require('express');
var router = express.Router();
var fs = require("fs");

// synchronous - blocking
router.post('/data', function(req, res) {
    var subId = req.headers['x-datasift-id'] || 'validate';
    fs.writeFileSync('./data/' + subId + '.' + req.headers['content-encoding'], req.rawBody);
    res.json({"success": true})
    next();
});

module.exports = router;