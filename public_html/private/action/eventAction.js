function getAllEvents (userId) {

     jQuery.ajax({
         type: "GET",
         async: false,
         url: "http://localhost:8080/information_system_app/webresources/entities.event",
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             $('#accordionAllEvents').empty();
             $('#accordionMyEvents').empty();
             $('#accordionSubscriptions').empty();
             $.each( data, function( key, event ) {
                 currentUserSubscriber = false;
                 for(i = 0; i < event.userCollection.length; i++) {
                     subricribterId = event.userCollection[i].userId;
                     if(subricribterId == userId) {
                         currentUserSubscriber = true;
                     }
                 }
                 //list all events
                $('#accordionAllEvents').append('<h3>' + event.eventTitle + '</h3>');
                if(!currentUserSubscriber) {
                    $('#accordionAllEvents').append('<div>'
                                    + '<button name="' + event.eventId + '" class="subscribe">Subscribe</button><br>'
                                    + '<img height="200" width="300" style="float: right;" src="' + event.eventImageLink + '" />'
                                    + '<h4>Description : </h4><p>' + event.eventDescription + '</p>'
                                    + '<h4>Date : </h4><p>' + event.eventDate.toString().replace("T00:00:00", "")+ '</p>'
                                    + '<h4>Created by : </h4><p>' + event.eventCreator.userLogin + '</p>'
                                    + '<hr/></div>');
                    $( 'button[name=' + event.eventId + '][class=subscribe]' ).button().on( "click", function() {
                        //alert("subscribe" + event.eventId);
                        subscribe(currentUser.userId, event.eventId);
                    });
                } else {
                    $('#accordionAllEvents').append('<div>'
                                    + '<p>you are subscribed to this event</p><br>'
                                    + '<img height="200" width="300" style="float: right;" src="' + event.eventImageLink + '" />'
                                    + '<h4>Description : </h4><p>' + event.eventDescription + '</p>'
                                    + '<h4>Date : </h4><p>' + event.eventDate.toString().replace("T00:00:00", "") + '</p>'
                                    + '<h4>Created by : </h4><p>' + event.eventCreator.userLogin + '</p>'
                                    + '<hr/></div>');
                }
                //list creations
                if(event.eventCreator.userId == userId) {
                    arrayIdCreations.push(event.eventId);
                    $('#accordionMyEvents').append('<h3>' + event.eventTitle + '</h3>');
                    $('#accordionMyEvents').append('<div>'
                                    + '<button name="' + event.eventId + '" class="delete">Delete</button><br>'
                                    + '<button name="' + event.eventId + '" class="modify">Modify</button><br>'
                                    + '<img height="200" width="300" style="float: right;" src="' + event.eventImageLink + '" />'
                                    + '<h4>Description : </h4><p>' + event.eventDescription + '</p>'
                                    + '<h4>Date : </h4><p>' + event.eventDate.toString().replace("T00:00:00", "")+ '</p>'
                                    + '<h4>Created by : </h4><p>' + event.eventCreator.userLogin + '</p>'
                                    + '<hr/></div>');
                    $( 'button[name=' + event.eventId + '][class=delete]' ).button().on( "click", function() {
                        deleteEvent(event.eventId);
                    });
                    $( "button[name='" + event.eventId + "'][class=modify]" ).button().on( "click", function() {
                        $("input[id=id][name=modification]").val(event.eventId);
                        $("input[id=title][name=modification]").val(event.eventTitle);
                        $("input[id=description][name=modification]").val(event.eventDescription);
                        $("input[id=datemodif][name=modification]").val(event.eventDate.toString().replace("T00:00:00", ""));
                        $("input[id=image][name=modification]").val(event.eventImageLink);
                        modifyEventDialog.dialog( "open" );
                    });
                }
                //list subscriptions
                if(currentUserSubscriber) {
                    $('#accordionSubscriptions').append('<h3>' + event.eventTitle + '</h3>');
                    $('#accordionSubscriptions').append('<div>'
                                + '<button name="' + event.eventId + '" class="unsubscribe">Unsubscribe</button><br>'
                                + '<img height="200" width="300" style="float: right;" src="' + event.eventImageLink + '" />'
                                + '<h4>Description : </h4><p>' + event.eventDescription + '</p>'
                                + '<h4>Date : </h4><p>' + event.eventDate.toString().replace("T00:00:00", "")+ '</p>'
                                + '<h4>Created by : </h4><p>' + event.eventCreator.userLogin + '</p>'
                                + '<hr/></div>');
                    $( 'button[name=' + event.eventId + '][class=unsubscribe]' ).button().on( "click", function() {
                        unsubscribe(currentUser.userId, event.eventId);
                    });
                }
             });
             $( "#accordionAllEvents" ).accordion({collapsible: true, heightStyle: "content"});
             $( "#accordionMyEvents" ).accordion({collapsible: true, heightStyle: "content"});
             $( "#accordionSubscriptions" ).accordion({collapsible: true, heightStyle: "content"});
         },

         error: function (jqXHR, status) {
             alert("A problem occurs while lookin for information, please restart later.");
         }
    });

}

function deleteEvent(eventId) {
    jQuery.ajax({
         type: "POST",
         url: "http://localhost:8080/information_system_app/webresources/entities.event/remove/" + eventId,
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             run();
         },

         error: function (jqXHR, status) {
         }
    });
}

function subscribe(userId, eventId) { 
    jQuery.ajax({
         type: "POST",
         url: "http://localhost:8080/information_system_app/webresources/entities.event/" + eventId + "/addsubscribers/" + userId,
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             run();
         },

         error: function (jqXHR, status) {
         }
    });
}

function unsubscribe(userId, eventId) {
    jQuery.ajax({
         type: "POST",
         url: "http://localhost:8080/information_system_app/webresources/entities.event/" + eventId + "/removesubscribers/" + userId,
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
             run();
         },

         error: function (jqXHR, status) {
         }
    });
    
}

function createEvent() {
    title = $("input[id=title][name=ajout]").val();
    description = $("input[id=description][name=ajout]").val();
    date = $("input[id=date][name=ajout]").val()+"T00:00:00";
    image = $("input[id=image][name=ajout]").val();
    var newEvent = {
        eventTitle:title,
        eventDescription:description,
        eventDate:date,
        eventCreator:currentUser,
        eventImageLink:image
    };
    jQuery.ajax({
        url: "http://localhost:8080/information_system_app/webresources/entities.event/create",
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data : JSON.stringify(newEvent),
        success: function (data, status, jqXHR) {
            alert("ajout effectué avec succés");
            run();
        },
        error: function (jqXHR, status) {
            alert("une erreur est survenu lors de l'ajout");
        }
    });
}

function modifyEvent() {
    id = $("input[id=id][name=modification]").val();
    title = $("input[id=title][name=modification]").val();
    description = $("input[id=description][name=modification]").val();
    date = $("input[id=datemodif][name=modification]").val()+"T00:00:00";
    image = $("input[id=image][name=modification]").val();
    var editedEvent = {
        eventTitle:title,
        eventDescription:description,
        eventDate:date,
        eventImageLink:image
    };
    $.ajax({
        url: "http://localhost:8080/information_system_app/webresources/entities.event/" + id,
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(editedEvent),
        success: function (editedEvent) {
            alert("modification effectuée avec succés");
            run();
        },
        error: function () {
            alert("une erreur est survenu lors de la modification");
        }
    });
}