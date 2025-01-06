"uses strict";

var CLIENT_ID = '796866674815-2hjnahq8rdvenusoqgf5cqpr1ojprlfn.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBi1QeaBfEfIDqsNafzEsesWbsqcWqefIE';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');


const log = console.log;

var gapiLoaded;
var gapiInitResolver;
var gapiInitialized = new Promise((resolve, reject) => {
    gapiInitResolver = resolve;
});

function handleClientLoad() {
    gapiLoaded = new Promise((resolve, reject) => {
        log("loading gapi");
        gapi.load('client:auth2', initClient);
        log("gapi loaded");
        resolve(true);
    });
}

function showError(error) {
    document.getElementById("error").innerText = error;
}

function initClient() {
    log("initClient");
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        const signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        updateSigninStatus(signedIn);
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        showError(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        gapiInitResolver(true);
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

