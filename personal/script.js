"uses strict";

import {Card} from "./cardmaker.js";

const spreadsheetId = "1OP3N34mfe1tkKNDhQeRtYonthTs_JEIR0JXTvv8VOaE";
var numResults = 0;
var inputRange;

const log = console.log;



const appendData = (messages) => {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (var i = 0; i < messages.length; i++) {
        var td = document.createElement("td");
        tr.appendChild(td);
        td.innerText = messages[i];
    }
}


const initDocument = () => {
    numResults = 0;
    var table = document.getElementById('table');
    table.innerHTML = "";
    const tr = document.createElement("tr");
    table.appendChild(tr);
    tr.innerHTML = "<th>Date</th><th>Weight</th><th>BMI</th><th>Local average</th>";
}


const showScriptError = (error) => {
    document.getElementById("scripterror").innerText = error;
}
const showMessage = (message) => {
    document.getElementById("message").innerText = message;
}

const listLatestValues = () => {
    initDocument();
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Data!A2:E',
    }).then(function (response) {
        var range = response.result;
        var freeCell = 0;
        for (var j = 0; j < range.values.length; j++) {
            if (range.values[j][0] != 0) {
                freeCell = j + 1;
            }
        }
        numResults = freeCell;
        console.log(numResults, "results");
        var subRange = numResults - 10;
        var supRange = numResults;
        if (subRange < 0) subRange = 0;
        var values = range.values.slice(subRange, supRange);
        if (values.length > 0) {
            for (let i = 0; i < values.length; i++) {
                var row = values[i];
                // print columns A and E, which correspond to indices 0 and 4.
                appendData([row[0], row[1].replace(".", ","), row[3], row[4]]);
            }
        } else {
            showScriptError("no data");
        }      
    }, function (response) {
        showScriptError('Error: ' + response.result.error.message);
    });
}

const makeCard = () => {    
    const card = new Card("card");
    const textInput = card.addTextInput("New weight:", {focused: true});
    textInput.onenter(value => {
        if (isNaN(value)) {
            textInput.showError(`not a number: ${value}`);
        } else {
            addValue(value);
            textInput.clear();
        }
    });
}

const addValue = (value) => {
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: ('Data!A:B' + (numResults + 2)),
        valueInputOption: "USER_ENTERED",
        resource: {
            majorDimension: "ROWS",
            values: [[new Date().toLocaleDateString("fr-FR"), value]]
        }
    }).then((response) => {
        var result = response.result;
        showMessage(`${result.updates.updatedCells} cells appended.`);
        listLatestValues();
    }).catch((err) => {
        showScriptError(err.result.error.code + ": " + err.result.error.message);
        console.log(err.result.error.code, err.result.error.message);
    });
}



gapiInitialized.then(() => {    
    listLatestValues();    
    makeCard();
});

