var userMarket = "UA";
var currency = "UAH";
var locale = "en-GB";

var origin;
var destiration;

var departureDate;
var returnDate;

var response;

function getFlightsList(cf, ct, ds, dt, callback) {
    departureDate = ds;
    if(dt!="") returnDate = dt;
    getAirportCode(cf, function(res) { 
        origin = res; 
        getAirportCode(ct, function(res) {
            destiration = res;
            getFlights(function(res) {
                response = res;
                callback(response);
            });
        });
    });
}

function getFlights(callback) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/" +
            userMarket + '/' + currency + '/' + locale + '/' + origin + '/' + destiration + '/' + departureDate +
            "?inboundpartialdate=" + returnDate,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "c59d936f3emsh896fdffbfc42328p16b9b1jsnfea8b92f041b"
        }
    }
    
    $.ajax(settings).done(function (response) {
        callback(response);
    });
}

function getAirportCode(city, callback) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/" +
            userMarket + '/' + currency + '/' + locale + "/?query=" + city,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "c59d936f3emsh896fdffbfc42328p16b9b1jsnfea8b92f041b"
        }
    }
    
    $.ajax(settings).done(function (response) {
        callback(response.Places[0].PlaceId);
    });
}

exports.getFlightsList = getFlightsList;
exports.getAirportCode = getAirportCode;