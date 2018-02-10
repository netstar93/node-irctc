var express = require('express');
var moment = require('moment');
var router = express.Router();


var yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);

var date = moment().subtract(1, 'days').format("DD-MM-YYYY");
console.log(date) // log yesterday's dat