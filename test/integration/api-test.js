'use strict';
var request = require('superagent')
    , expect = require("chai").expect
    , should = require('should')
    , server
    , fs = require('fs')
    , text =''
    ;

describe('#REST API', function() {

    var app = require('../../app');
    before(function(){
        server = app.listen(8080);
        text = fs.readFileSync('./test/integration/data.json','utf8').toString();
    });

    it('- /DATA testing a successful request', function(done) {
        request.post('http://localhost:8080/api/data/')
            .set('X-DataSift-ID', 'foo')
            .send(text)
            .end(function(err, res){
                expect(res).to.exist;
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.eql({
                    "success": true
                });
                done();
            });
    });
    
    after(function(done) {
        server.close();
        done();
    });

});