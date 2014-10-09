function event(eventId, eventTitle, eventDescription, eventDate, eventCreator, eventImageLink, userCollection) {
    this.eventId = eventId;
    this.eventTitle = eventTitle;
    this.eventDescription = eventDescription;
    this.eventDate = eventDate;
    this.eventCreator = eventCreator;
    this.eventImageLink = eventImageLink;
    this.userCollection = userCollection;
    this.toJsonString = function () { return JSON.stringify(this); };
};


