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
        //https://developers.google.com/maps/documentation/static-maps/intro
        //var source = "https://maps.googleapis.com/maps/staticmap"
        //https://maps.googleapis.com/maps/api/staticmap?size=300x300&center=46.0939992,-64.8025372&zoom=13&markers=color:green%7c46.0939992,-64.802537
        //%7C is the pipe |

        //Get Map source using geolation values
        var source = "https://maps.googleapis.com/maps/api/staticmap?size=300x300&center=" +
                      pos.coords.latitude + "," + pos.coords.longitude +
                      "&zoom=13&markers=color:green%7c" + 
                     pos.coords.latitude + "," + pos.coords.longitude;
        console.log(source);
        //Dislay the map in image src
        $("#map").attr('src', source);


        $("#map").css('display', 'block');//turn visibility back on
        

    }

    function geolocationError(error) {
        $("#cur_position").html('<p>Error getting geolocation: '
                                + error.code + '<br>'
                                +  error.message);
    }


    /* Demo 4:  Google Map : 
     * Google Maps JavaScript API
     * https://developers.google.com/maps/documentation/javascript/
     *  -Content-Security-Policy meta tag:  
     *    http://*.google.com/ 
     *    https://*.googleapis.com/
     *                                      
     *    style-src https://fonts.googleapis.com 
     *    font-src https://fonts.gstatic.com;
     */
    $('#getMap').on('click', function (e) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            var lat = pos.coords.latitude;
            var lon = pos.coords.longitude;
            //console.log('lat: ' + lat);
            // console.log('lon: ' + lon);
            var myLatlng = new google.maps.LatLng(lat, lon);

            // Create the Google Maps map and add it to the #mapCanvas container
            var mapOptions = {
                zoom: 12,
                //center: new google.maps.LatLng(lat,lon),
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var mapItem = document.getElementById('googlemap');
            window.cityMap = new google.maps.Map(mapItem, mapOptions);

            /* custom marker icon */
            var img = 'images/here.png';
            var hereMarker = new google.maps.Marker({
                position: myLatlng,
                map: window.cityMap,
                icon: img
            });
            /* end custom marker icon */

            /* info window */
            var info =
                ('Latitude: ' + pos.coords.latitude + '<br>' +
                'Longitude: ' + pos.coords.longitude + '<br>' +
                'Altitude: ' + pos.coords.altitude + '<br>' +
                'Accuracy: ' + pos.coords.accuracy + '<br>' +
                'Altitude Accuracy: ' + pos.coords.altitudeAccuracy + '<br>' +
                'Heading: ' + pos.coords.heading + '<br>' +
                'Speed: ' + pos.coords.speed + '<br>' +
                'Timestamp: ' + new Date(pos.timestamp));

            var infoWindow = new google.maps.InfoWindow({
                position: myLatlng,
                content: info
            });
            google.maps.event.addListener(hereMarker, 'click', function () {
                infoWindow.open(window.cityMap, hereMarker);
            });
            //infoWindow.open(window.cityMap);
            /* end info window */

        }, function (error) {
            alert('Geolocation error: ' + error.message);
            // Create the Google Maps map and add it to the #mapCanvas container
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(46.094305, -64.800907),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var mapItem = document.getElementById('googlemap');
            window.cityMap = new google.maps.Map(mapItem, mapOptions);
        }, { timeout: 10000 });


    });


    /* Demo 5:  Contacts
     * Contacts: cordova-plugin-contacts
     * 
     */
    $('#getContact').on('click', function (e) {
        //Prepare contact find options
        var options = new ContactFindOptions();
        options.filter = ''; //no search string 
        options.multiple = true; //return multiple contacts

        //Contacts find:
        //name: An object containing all components of a person's name
        //phoneNumbers: An array of all the contact's phone numbers
        //emails: An array of all the contact's email addresses

        //Get the contacts from the user's device
        navigator.contacts.find(["name", "phoneNumbers", "emails","nickname"],
                  contacts_success, contacts_fail, options);
        //force ajax spinner to show 
        setTimeout(function () {
            $.mobile.loading('show');
        },1);//1sec timeout

    });

    //for sorting
    var cSort = function (a, b) {
        //check for undefined
        var aname = "";
        var bname = "";
        aname = a.name.formatted || "unknown contact";
        bname = b.name.formatted || "unknown contact";
        //end check undefined
        var an = aname.toUpperCase();
        var bn = bname.toUpperCase();
        //var an = a.name.formatted.toUpperCase();
        //var bn = b.name.formatted.toUpperCase();
        return (an < bn) ? -1 : (an == bn) ? 0 : 1;
    };

    function contacts_success(contacts) {
        //hide the spinner
        setTimeout(function () {
            $.mobile.loading('hide');
        }, 1);

        contacts = contacts.sort(cSort);

        //Get the total number of contacts in contacts database
        //console.log(contacts.length);
        $('.total').html(contacts.length + ' contacts found');

        
        //loop through all contacts and display within listview widget
        for (var i = 0; i < contacts.length; i++) {
            //set default variables

            var contact_name = "";
            var contact_phone = "";
            var contact_email = "";

            if (!contacts[i].name) {
                //if contact has no name try nickname other display unknown
                contact_name = contacts[i].nickname || "unknown";

            } else {
                //Display formatted contact name or unknown contact in no formatted name
                contact_name = contacts[i].name.formatted || "unknown contact";
                
                //Display phone numbers - if exists
                if(contacts[i].phoneNumbers != null &&
                   typeof contacts[i].phoneNumbers !== "undefined" &&
                          contacts[i].phoneNumbers.length > 0) {
                    //Loop all phonenumbers for current contact
                    for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                        console.log(contacts[i].phoneNumbers[j].type + ' ' + contacts[i].phoneNumbers[j].value);

                        contact_phone += (contacts[i].phoneNumbers[j].type || '') +  
                                  ' phone: ' + (contacts[i].phoneNumbers[j].value ||'') + '<br>';
                        /*
                         * work phone:  (506) 123-7894
                         * mobile phone:  (506) 456-9878
                         * work fax phone: (506) 897-4598
                         */
                    }//end of phone loop
                }//end of if phone

                //display emails  if exists
                if (contacts[i].emails != null &&
                    typeof contacts[i].emails !== "undefined"
                    && contacts[i].emails.length > 0) {
                    //loop the emails
                    for (var k = 0; k < contacts[i].emails.length; k++) {
                        contact_email += (contacts[i].emails[k].type)
                            + ': ' + (contacts[i].emails[k].value) + '<br>';

                    }
                }
                
            }//end of else no contact.name
            //console.log('contact phone' + contact_phone);
            //Append all the contact info to listview widget
            $('#contacts_output').append('<li><a href=""><h3>' + contact_name + '</h3>' +
                                         '<p>' + contact_phone + '</p>' +
                                         '<p>' + contact_email + '</p>' +
                                         '</a></li>');
            
        }//end of loop

        //Refresh the listview widget
        $('#contacts_output').listview().listview('refresh');


    }//end of contact success callback

    function contacts_fail() {
        //Failed to retrieve contacts - display error message
        $('#contacts_output').html('<h2>Error getting contacts</h2>');
    }//end of contact fail callback



} )();