var Skyscanner = require("./Skyscanner");
var Templates = require("../Templates");
var Validator = require("./Validation");
var Storage = require("../LocalStorage");
var Suggestions = require("./suggestions");

var cards = []; //flight cards
var $container = $("#flight-result");

function initializeCards() {
    var cart = Storage.get("flightCart");
    if(cart) cards = cart;
    updateFlights();
}

function updateFlights() {
    Storage.set("flightCart", cards);
    $container.html("");

    function showOneCard(flightCard) {
        var html_card = Templates.FlightCard(flightCard);
        var $node = $(html_card);
        $container.append($node);
        $node.hide();
        $node.slideDown(700);
    }

    cards.forEach(q => showOneCard(q));
    if($container.html() == "") cartIsEmpty();
    $("#waiting").slideUp(20);
}

function addToCards(quote, apiResponse, returnTicket) {
    if(  (!($("#direct").is(':checked') && quote.Direct == false))   &&   (quote.MinPrice < $("#maxPrice").val())   ) {
        var places = apiResponse.Places;
        var carriers = apiResponse.Carriers;
        var currencies = apiResponse.Currencies[0];
    
        var orig = places.find(p => p.PlaceId == quote.OutboundLeg.OriginId);
        var dest = places.find(p => p.PlaceId == quote.OutboundLeg.DestinationId);
        var departureDate = quote.OutboundLeg.DepartureDate;
        var oneWayCarrier = carriers.find(c => c.CarrierId == quote.OutboundLeg.CarrierIds[0]);
        var price = quote.MinPrice;
        var currency = currencies.Code;
    
        cards.push({
            route: orig.CityName + " " + orig.IataCode + " - " + dest.CityName + " " + dest.IataCode,
            depDate: "Dep. date: " + departureDate.slice(0, 10),
            carrier: "Carrier: " + oneWayCarrier.Name,
            price: "Price: " + price + " " + currency,
            returnT: returnTicket
        });
    }
}

var temp = true;

function toFindFlightsList() {
    $("#waiting").slideDown(100);
    $container.html("");
    cards = [];
    Storage.set("flightCart", cards);
    if(Validator.valid($("#cityfrom").val(), $("#cityto").val(), $("#datesince").val(), $("#dateto").val())) {
        Skyscanner.getFlightsList($("#cityfrom").val(), $("#cityto").val(), $("#datesince").val(), $("#dateto").val(), function(res) {
            if (res.Quotes.length === 0) temp = false;
            res.Quotes.forEach(q => addToCards(q, res, "to"));
            if ($("#return_ticket").is(':checked')) toFindReturnFlights(function() {
                updateFlights();
            }); else if(temp == false) cartIsEmpty();
        });
    } else dataIsIncorrect();
}

function toFindReturnFlights(callback) {
    Skyscanner.getFlightsList($("#cityto").val(), $("#cityfrom").val(), $("#dateto").val(), $("#dateto").val(), function(res) {
        if (res.Quotes.length === 0 && temp == false) cartIsEmpty();
        res.Quotes.forEach(q => addToCards(q, res, "from"));
        callback();
    });
}

function cartIsEmpty() {
    var html_card = Templates.EmptyCard();
    $("#waiting").addClass("hidden");
    $(html_card).appendTo($container);
}

function dataIsIncorrect() {
    var html_card = Templates.IncorrectData();
    $("#waiting").addClass("hidden");
    $(html_card).appendTo($container);   
}

$("#searchForFlights").click(function() {
    toFindFlightsList();
});

exports.toFindFlightsList = toFindFlightsList;
exports.updateFlights = updateFlights;
exports.initializeCards = initializeCards;