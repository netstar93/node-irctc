var express = require('express');
var router = express.Router();
var moment = require('moment');
var request =  require("request");var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/live', function(req, res){
  res.render('live',{
    pageTitle: 'live status',
    pageID:'live'
  });
});

router.get('/op', function(req, res){
    res.render('output',{
        pageTitle: 'live status',
        pageID:'live',
    });
});
router.get('/trains/:type', function(req, res){
    var type = req.params.type;
    var mode = 'cancelled';
    var pageID = 'cancelled';
    var renderer = 'cancelled-trains';
    var apikey = 'r26hnyldh1';
    var date = moment().format("DD-MM-YYYY");
    if(type == 'rs'){
        mode = 'rescheduled';
        renderer = 'rs-trains';
    }
    var Url = "https://api.railwayapi.com/v2/"+mode+"/date/"+ date +"/apikey/"+apikey;
    console.log("Url : ",Url);
    var options = { url:Url, headers: {'connection': 'Keep-Alive'}};
    request(Url, function (error, response, data) {
        if(error) {
            console.log("Error : ",error);
            return false;
        }
        if (!error && response.statusCode == 200) {

            var data = JSON.parse(data);
            console.log("data : ",data);
            res.render(renderer ,
                {data : data , pageTitle: mode , pageID:pageID ,date:date , type:type});
        }
    });

});

router.get('/pnr', function(req, res){
    res.render('pnr',{
        pageTitle: 'pnr status',
        pageID:'pnr'
    });
});

router.post('/api', function(req,res){
    var type   =   req.body.type;
    var renderer = 'output';
    var pageTitle = 'live status';
    var pageID = 'liveop';
    var apikey = 'r26hnyldh1';
    var Url;

    if(type == 'live') {
        var train_number = req.body.train_number;
        var start_date   =   req.body.start_date;
        var date = moment().subtract(start_date, 'days').format("DD-MM-YYYY");
        Url = "https://api.railwayapi.com/v2/live/train/" + train_number + "/date/" + date + "/apikey/"+apikey;
    }
    else if(type == 'pnr'){
        pageID = 'pnrop';
        var pnr_number = req.body.pnr_number;
        Url = "https://api.railwayapi.com/v2/pnr-status/pnr/"+pnr_number+"/apikey/"+apikey;
    }
    else if(type == 'cancelled'){
        pageID = 'cancelled';
        renderer = 'live';
        var date = moment().subtract(start_date, 'days').format("DD-MM-YYYY");
        Url = "https://api.railwayapi.com/v2/cancelled/date/"+ date +"/apikey/"+apikey;
    }
    var options = { url:Url, headers: {'connection': 'Keep-Alive'}};
    request(Url, function (error, response, data) {
        if(error) {
            console.log("Error : ",error);
            return false;
        }
        if (!error && response.statusCode == 200) {
            // console.log("data : ",data);
            var data = JSON.parse(data);
            res.render(renderer ,
                {data : data , pageTitle: pageTitle , pageID:pageID ,date:date});
        }
    });

});

module.exports = router;
