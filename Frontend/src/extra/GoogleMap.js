var COORDINATES = require("./coordinates");
var getFlight = require("./Flights");

var coordinates = COORDINATES.coordinates;
var html_element;
var map;
var cityChosen;

function initializeMap() {
    var mapProp = {
        center:	coordinates[0][0],
        zoom: 10
    };
    html_element = document.getElementById('googleMap');
    map	= new google.maps.Map(html_element, mapProp);    
}

$("#tryme-button").click(function() {
    var min = 0;
    var max = 49;
    var rnd = Math.floor(Math.random()*(max - min + 1) + min);

    var mapProp = {
        center:	coordinates[rnd][0],
        zoom: 10
    };
    map = null;
    map	= new google.maps.Map(html_element, mapProp);
    cityChosen = coordinates[rnd][1];    
    $("#tryme-button-result").removeClass("hidden");
});

$("#tryme-button-result").click(function() {
    $("#tryme-button-result").addClass("hidden");
    $("#cityto").val(cityChosen);
    location.href = "#search";
    getFlight.toFindFlightsList();
});

exports.initializeMap = initializeMap;