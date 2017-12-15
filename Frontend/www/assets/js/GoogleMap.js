
function initialize(){
    // alert("Initialized");
    // console.log("init")
    var mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 16
    };
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element,mapProp);
    var point = new google.maps.LatLng(50.464379, 30.519131);
    var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: "/assets/images/map-icon.png"
    });
    directionsDisplay.setMap(map);
    marker.setMap(map);
    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;
        marker.setMap(map);
    });

    function geocodeLatLng(latlng, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng},
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[1]) {
                    var adress = results[1].formatted_address;
                    callback(null, adress);
                }
                else {
                    callback(new Error("Can't	find	adress"));
                }
            });
    }
    function calculateRoute(A_latlng,	B_latlng,	callback) {
        var directionService =	new	google.maps.DirectionsService();
        directionService.route({
                origin:	A_latlng,
                destination:	B_latlng,
                travelMode:	google.maps.TravelMode["DRIVING"] },
            function(response,	status)
            {
                if	(
                    status	==	google.maps.DirectionsStatus.OK )	{
                    directionsDisplay.setDirections(response);
                    //directionsDisplay.setDirections(response);
                    var leg	=	response.routes[0].legs[0];
                    callback(null,	{
                        duration:	leg.duration
                    });
                }
                else {
                    callback(new Error("Cannot find direction"));
                }
            });
    }
    var markers = [];
    function removeMarkers(){
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }
    //remove references on markers
    function deleteMarkers() {
        removeMarkers();
        markers = [];
    }
    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;
        removeMarkers();
        geocodeLatLng(coordinates, function (err, adress) {
            if (!err) {
                console.log(adress);
                $("#address-input").val(adress);
                $(".order-info-adress").html(adress);
                var point1 = coordinates;
                var marker1 = new google.maps.Marker({
                    position: point1,
                    map: map,
                    icon: "/assets/images/home-icon.png"
                });
                markers.push(marker1);
            } else {
                console.log("No address")
            }
        });
        calculateRoute(coordinates, point, function (err, time){
            if (!err) {
                console.log(time);
                $(".order-info-time").html(time.duration.text);
            }
            else {
                console.log("Can't count route")
            }
        });
    });
}
//exports.calculateRoute = calculateRoute;
//exports.geocodeLatLng = geocodeLatLng;
initialize();
// google.maps.event.addDomListener(window, 'load', initialize);