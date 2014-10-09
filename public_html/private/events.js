//GLOBAL
var createEventDialog;
var modifyEventDialog;
var connectDialog;
var currentUser;
var arrayIdSubscriptions = [];
var arrayIdCreations = [];

//FUNCTIONS
function connect() {
    login = "saberkan";//$('#login[name=connection]').val();
    password = "saberkan";//$('#password[name=connection]').val();
    getUser(login, password);
}

function run() {
    getAllEvents(currentUser.userId);
}