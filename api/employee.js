var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1/');
var bucket = cluster.openBucket('BucketName');
var moment = require('moment');

router.get("/employee/userlist", function(req, res){
    bucket.get("user_id_list",function(err, result){
        if(err) throw err;
        //Sends couchbase result value by specific array name
        res.send(result.value.userIdList);
    });
});

router.get("/employee/collectinsert", function(req, res){
    bucket.get(getCurrDate(),function(err, result){
        if(err) throw err;
        //Sends couchbase result value by specific array name
        res.send(result.value.users);
    });
});

router.get("/employee/collectinsert/:_date", function(req, res){
    bucket.get(req.params._date,function(err, result){
        if(err) throw err;
        //Sends couchbase result value by specific array name
        res.send(result.value.users);
    });
});

router.get("/employee/collectinsert/:_startdate/:_enddate", function(req, res){
    var startDate = moment(req.params._startdate);
    var endDate = moment(req.params._enddate);
    var daysOfYear = [];
    //Creates data array between startdate and enddate parameters
    for(var date = moment(startDate); date.diff(endDate,'days') < 1; date.add(1, 'days')){
        daysOfYear.push(formatDate(date));
    }

    bucket.getMulti(daysOfYear,function(err, results){
        if(err) throw err;
        var result = [];
        for(var key in results) {
            if(results.hasOwnProperty(key)) {
                if(results[key].error) {
                    console.log("`" + key + "`: " + JSON.stringify(results[key]));
                }
            }
            result.push(results[key].value);
        }
        res.send(result);
    });
});

function getCurrDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
    var currdate = year + "-"+ month + "-" + day;
    return currdate;
}

function formatDate(date){
    var d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    var day  = d.getDate();
        day = (day < 10 ? "0" : "") + day;
    var currdate = year + "-"+ month + "-" + day;
    return currdate;
}

module.exports = router;