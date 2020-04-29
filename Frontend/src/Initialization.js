var GoogleMap = require("./extra/GoogleMap");
var fligts_hotels = require("./extra/Flights");
var API = require("./API");

const defCityFrom = "Kyiv";
const defDateSince = "2020-07-01";
const defDateTo = "2020-07-05";
const defMaxPrice = "10000";

$(function(){
    $("#cityfrom").val(defCityFrom);
    $("#datesince").val(defDateSince);
    $("#dateto").val(defDateTo);
    $("#maxPrice").val(defMaxPrice);
    $("#waiting").slideUp();

    window.location = "#";
    fligts_hotels.initializeCards();
    GoogleMap.initializeMap();
});

$("#login").click(function() {
    $("#form").removeClass("visibility-none");
});

$("#submitEmail").click(function() {
    $("#form").addClass("visibility-none");
    $("#email").html("");
    $("#password").html("");

    data = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    API.login( data, function() {
            console.log(data);
            $("#login").html("");
            $("#login").html($("#email").val());
            $("#login").removeClass("bg-black");
            $("#login").addClass("bg-green");
            $("#login").prop('disabled', true);
        }
    );
})