function user(userId, userLogin, userFirstName, userLastName, password) {
    this.userId = userId;
    this.userLogin = userLogin;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.password = password;
    this.toJsonString = function () { return JSON.stringify(this); };
};