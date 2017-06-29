var express = require('express');
var router = express.Router();


router.get("/", function(req, res, next){
    res.render('index', {title: 'GoogleCharts Dashboard', dashboard_title: 'Collect/Insert Count'});
});
router.get("/employee/detail", function(req, res, next){
    res.render('employee/detail', {title: 'Detail Dashboard Page',dashboard_title: 'Collect/Insert Count'});
});


module.exports = router;