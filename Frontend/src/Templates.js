var fs = require('fs');
var ejs = require('ejs');

exports.FlightCard = ejs.compile(fs.readFileSync('./Frontend/templates/flightCard.ejs', "utf8"));
exports.EmptyCard = ejs.compile(fs.readFileSync('./Frontend/templates/EmptyCard.ejs', "utf8"));
exports.IncorrectData = ejs.compile(fs.readFileSync('./Frontend/templates/IncorrectData.ejs', "utf8"));