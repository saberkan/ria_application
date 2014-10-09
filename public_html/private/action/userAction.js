function getAllUsers () {

     jQuery.ajax({
         type: "GET",
         url: "http://localhost:8080/information_system_app/webresources/entities.user",
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             $.each( data, function( key, user ) {
                alert( user.userLogin );
              });
         },

         error: function (jqXHR, status) {
         }
    });

}

function getUser (login, password) {
    
         jQuery.ajax({
         type: "GET",
         url: "http://localhost:8080/information_system_app/webresources/entities.user",
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             userExist = false;
             $.each( data, function( key, user ) {
                if(user.userLogin == login && user.password == password  ) {
                    currentUser = user;
                    userExist = true;
                    alert("Welcome " + user.userLogin);
                    connectDialog.dialog( "close" );
                    run();
                    return;
                 }
              });
              if(!userExist)
                alert("This user do not exist.");
         },

         error: function (jqXHR, status) {
         }
    });
    
}

/*
function getUserSubscriptions(userId) {
    
     jQuery.ajax({
         type: "GET",
         url: "http://localhost:8080/information_system_app/webresources/entities.user/" + userId + "/subscriptions",
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             $('#accordionSubscriptions').empty();
             $.each( data, function( key, event ) {
                arrayIdSubscriptions.push(event.eventId);
                $('#accordionSubscriptions').append('<h3>' + event.eventTitle + '</h3>');
                $('#accordionSubscriptions').append('<div>'
                                + '<button name="' + event.eventId + '" class="unsubscribe">Unsubscribe</button><br>'
                                + '<img style="float: left;" src="' + event.eventImageLink + '" />'
                                + '<h4>Description : </h4><p>' + event.eventDescription + '</p>'
                                + '<h4>Date : </h4><p>' + event.eventDate + '</p>'
                                + '<h4>Created by : </h4><p>' + event.eventCreator.userLogin + '</p>'
                                + '</div>');
                $( 'button[name=' + event.eventId + '][class=unsubscribe]' ).button().on( "click", function() {
                    unsubscribe(currentUser.userId, event.eventId);
                });
             });
         },

         error: function (jqXHR, status) {
             alert("A problem occurs while lookin for information, please restart later.");
         }
         
         
    });
}


function getUserCreations(userId) {

     jQuery.ajax({
         type: "GET",
         url: "http://localhost:8080/information_system_app/webresources/entities.user/" + userId + "/creations",
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             $('#accordionMyEvents').empty();
             $.each( data, function( key, event ) {
                arrayIdCreations.push(event.eventId);
                $('#accordionMyEvents').append('<h3>' + event.eventTitle + '</h3>');
                $('#accordionMyEvents').append('<div>'
                                + '<button name="' + event.eventId + '" class="delete">Delete</button><br>'
                                + '<button name="' + event.eventId + '" class="modify">Modify</button><br>'
                                + '<img style="float: left;" src="' + event.eventImageLink + '" />'
                                + '<h4>Description : </h4><p>' + event.eventDescription + '</p>'
                                + '<h4>Date : </h4><p>' + event.eventDate + '</p>'
                                + '<h4>Created by : </h4><p>' + event.eventCreator.userLogin + '</p>'
                                + '</div>');
                $( 'button[name=' + event.eventId + '][class=delete]' ).button().on( "click", function() {
                    deleteEvent(event.eventId);
                });
                $( ".modify" ).button().on( "click", function() {
                    $("input[id=name][name=modification]").val(event.eventTitle);
                    modifyEventDialog.dialog( "open" );
                });
             });
         },

         error: function (jqXHR, status) {
             alert("A problem occurs while lookin for information, please restart later.");
         }
    });
    
}
*/