
if (Meteor.isClient) {
    var MAP_ZOOM = 15;
    var id = Meteor.userId();
    //var COUNT = 0;

    Meteor.startup(function() {
        GoogleMaps.load();
    });

Template.map.onRendered(function() {
    GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();
    var lom;
    console.log(latLng);
    console.log(id);
    if (! latLng)
        return;
    Meteor.call('checkMarker', id, function (error, result) {
//       if (result == 0) {
//           Meteor.call('insertMarker', id, latLng);
//           console.log("callback if");
//           //console.log(result);
//       }
//       else {
//           //latLng = {lat: 0, lng: 0};
//           //console.log(latLng);
//           Meteor.call('updateMarker', id, latLng);
//           console.log("callback else");
//           //console.log(result);
//       }

       //something both must do
        Meteor.call('getMarker', function (error1, result1) {
            //console.log(result1);
            lom = result1;
            //console.log(lom);



            var pointMarkerImage = new Array();//store image of marker in array
            var pointMarker = new Array();//store marker in array

            for (i = 0; i < lom.length; i++) {
                console.log(lom[i]);
                //var text = lom[i].lat.toString().concat(",", lom[i].lng.toString()).concat(",", lom[i].uid.toString());
                var text = lom[i].uid.toString();
                //var text = this.uid;
                //change this to the user's destination and contact
//                if(latLng.lat == lom[i].lat && latLng.lng == lom[i].lng) {
//                    //text = "you're here";
//                    //text = lom[i].lat.toString().concat(",", lom[i].lng.toString());
//                    //var text = lom[i].uid.toString();
//                    var text = this.uid;
//                }
//                var marker = new google.maps.Marker({
//                    position: new google.maps.LatLng(lom[i].lat, lom[i].lng),
//                    map: map.instance,
//                    title: text
//                });



    pointMarkerImage[i] = new google.maps.MarkerImage('marker.png');
    pointMarker[i] = new google.maps.Marker({
            position: new google.maps.LatLng(lom[i].lat, lom[i].lng),
            map: map.instance,
            title: text
    });

console.log(pointMarker[i].title);

//  var contentString = '<div id="content">'+
//                          '<button type="submit" id="chatbox" >Continue</button>'+
//                          '<p>'+this.title+'</p>'
//                          '</div>';
//
//                     var infowindow = new google.maps.InfoWindow({
//                        content: contentString
//                      });

google.maps.event.addListener(pointMarker[i], 'click', function(){
    console.log(this.title);
var contentString = '<div id="content">'+
                          '<button type="submit" id="chatbox" >Continue</button>'+
                          '<p>'+this.title+'</p>'
                          '</div>';
 var infowindow = new google.maps.InfoWindow({
                        content: contentString
                      });



     var receiver = UserProfile.findOne({user_id: this.title});
     //                    Session.set('receiverId', receiver);
     infowindow.open(map, this);
    });






//                console.log(this);
//                console.log(this.marker);
//
//                var contentString = '<div id="content">'+
//                      '<button type="submit" id="chatbox" >Continue</button>'+
//                      '<p>'+marker.title+'</p>'
//                      '</div>';
//
//                 var infowindow = new google.maps.InfoWindow({
//                    content: contentString
//                  });
//                marker.addListener('click', function() {
//    //                                Meteor.call(
//    //                                    'sendEmail',
//    //                                    'ws_12345@yahoo.com',
//    //                                    'Hello from Meteor!',
//    //                                    'This is a test of Email.send.'
//    //                                );
////                     Session.set('receiverId', true);
//
//                    var receiver = UserProfile.findOne({user_id: marker.title});
//                    Session.set('receiverId', receiver);
//                    infowindow.open(map, this);
//
//                });









            }


//var pointMarkerImage = new Array();//store image of marker in array
//var pointMarker = new Array();//store marker in array

//create number of markers based on collection.length
//function setPoint(){
//  for(var i=0; i<lom.length; i++){
//
//    pointMarkerImage[i] = new google.maps.MarkerImage('marker.png');
//    pointMarker[i] = new google.maps.Marker({
//            position: lom[i],
//            map: map,
//            icon: pointMarkerImage[i],
//            animation: google.maps.Animation.BOUNCE,
//            title: "lom"+ i
//    });
//
//    google.maps.event.addListener(pointMarker[i], 'click', function(){
//      window.open("blog/page01.html","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
//    }
//    );
//  }
//}


        });

//    });
});
});
})


    Template.map.onCreated(function() {
        var self = this;

        GoogleMaps.ready('map', function(map) {
            // Create and move the marker when latLng changes.
            //self.autorun(function() {

            Meteor.setInterval(function() {
                var latLng = Geolocation.latLng();
                var lom;
                console.log(latLng);
                console.log(id);
                if (! latLng)
                    return;

                // If the marker doesn't yet exist, create it.
                Meteor.call('checkMarker', id, function (error, result) {
                   if (result == 0) {
                       Meteor.call('insertMarker', id, latLng);
                       console.log("callback if");
                       //console.log(result);
                   }
                   else {
                       //latLng = {lat: 0, lng: 0};
                       //console.log(latLng);
                       Meteor.call('updateMarker', id, latLng);
                       console.log("callback else");
                       //console.log(result);
                   }

                   //something both must do
                    Meteor.call('getMarker', function (error1, result1) {
                        //console.log(result1);
                        lom = result1;
                        //console.log(lom);
                        for (i = 0; i < lom.length; i++) {
                            console.log(lom[i]);
                            var text = lom[i].lat.toString().concat(",", lom[i].lng.toString());




                            //change this to the user's destination and contact
                            if(latLng.lat == lom[i].lat && latLng.lng == lom[i].lng) {
                                //text = "you're here";
                                text = lom[i].lat.toString().concat(",", lom[i].lng.toString()).concat(",", lom[i].uid.toString());
                            }
                            var marker = new google.maps.Marker({
                                position: new google.maps.LatLng(lom[i].lat, lom[i].lng),
                                map: map.instance,
                                title: text
                            });


                            var contentString = '<div id="content">'+
                                  '<button type="submit" id="chatbox">Continue</button>'+
                                  '<p>'+text+'</p>'
                                  '</div>';

                             var infowindow = new google.maps.InfoWindow({
                                content: contentString
                              });
                            marker.addListener('click', function() {
//                                Meteor.call(
//                                    'sendEmail',
//                                    'ws_12345@yahoo.com',
//                                    'Hello from Meteor!',
//                                    'This is a test of Email.send.'
//                                );

                                infowindow.open(map, marker);
                            });


                        }


                    });

                });


                // Center and zoom the map view onto the current position.
                map.instance.setCenter(new google.maps.LatLng(latLng.lat, latLng.lng));
                map.instance.setZoom(MAP_ZOOM);

                //COUNT = COUNT + 1;
                //console.log(COUNT);
            }, 1000000); // change number > for more delay per function call
        });
    });

    Template.map.helpers({
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var latLng = Geolocation.latLng();
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && latLng) {
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        }
    });

    Template.map.events({
        'click #chatbox': function(event) {
            event.preventDefault();
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");

        },
        'click #closebtn': function(event) {
            event.preventDefault();
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("hide");
        }
    })






}


