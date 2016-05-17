// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Cordova is ready - get device properties
        /* First we need to import the necessary API plugins
         * Demo 1:  Retrieve the device properties
         * Device:  cordova-plugin-device
         * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html
         */

        var element = document.getElementById("deviceproperties");
        element.innerHTML = 'Device Model: ' + device.model + '<br>' +
                          'Device Cordova: ' + device.cordova + '<br>' +
                         'Device Platform: ' + device.platform + '<br>' +
                         'Device UUID: ' + device.uuid + '<br>' +
                         'Device Version: ' + device.version + '<br>';


    };

    /* Demo 2:  Network Information
     * Network Information:  cordova-plugin-network-information
     * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/index.html
     */
    $('#getConnection').on('click', function (e) {
        //alert('connection click');
        //console.log("get connection clicked");
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        //console.log(networkState);

        //alert('Connection type: ' + states[networkState]);
        $('#connectionproperties').html(states[networkState]);
    });

    /* Demo 3:  Geolocation
     * Geolocation:  cordova-plugin-geolocation
     * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html
     * Notes:
     *        - emulator:  need to enableHighAccuracy: true
     *        - real device:  turn off enableHighAccuracy
     *        - google static map url:  https://maps.googleapis.com/maps/staticmap
     */
    $('#getGeo').on('click', function (e) {
        //alert('connection click');
        //console.log("get geo clicked");

        navigator.geolocation.getCurrentPosition(geolocationSuccess,
                                         geolocationError,
                                         {timeout:10000, enableHighAccuracy:true});
    });

    function geolocationSuccess(pos) {
        var text = "<ul><li>Latitude: " + pos.coords.latitude + "</li>" +
                       "<li>Longitude: " + pos.coords.longitude + "</li>" +
                       "<li>Accuracy: " + pos.coords.accuracy + "</li>" +
                   "</ul>";
        $("#cur_position").html(text);

        //Display static google map 
        //https://developers.google.com/maps/
        //var source = "https://maps.googleapis.com/maps/staticmap"
        //https://maps.googleapis.com/maps/api/staticmap?size=300x300&center=46.0939992,-64.8025372&zoom=13&markers=color:green%7c46.0939992,-64.802537
    }

    function geolocationError(error) {
        $("#cur_position").html('<p>Error getting geolocation: ' + error.code + '<br>' +
                                error.message);
    }


    $('#getMap').on('click', function (e) {
        //alert('connection click');
        //console.log("get map clicked");
    });

    $('#getContact').on('click', function (e) {
        //alert('connection click');
        //console.log("get contact clicked");
    });


} )();