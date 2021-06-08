"uses strict";

import { Card } from "./cardmaker.js";
import { add, getColumnNames, getDatabaseRange, makeUUID } from "./sheetserver.js";

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

const listLatestValues = async () => {
    initDocument();
    getDatabaseRange(spreadsheetId, "Data");
    try {
        let range = await getDatabaseRange(spreadsheetId, "Data");        
        var values = range.slice(-10);        
        if (values.length > 0) {
            for (let i = 0; i < values.length; i++) {
                var row = values[i];
                // print columns A and E, which correspond to indices 0 and 4.
                appendData([row[1], row[2], row[4], row[5]]);
            }
        } else {
            showScriptError("no data");
        }
    } catch (err) {
        showScriptError('Error: ' + err);
    };
}


const makeCard = () => {
    const sendValue = (value) => {
        if (isNaN(value)) {
            textInput.showError(`not a number: ${value}`);
        } else {
            addValue(value);
            textInput.clear();
        }
    }
    const card = new Card("card");
    const textInput = card.addTextInput("New weight:", { focused: true });
    const actionList = card.addActions();
    const action = actionList.addAction("Add to sheet");
    action.onclick(() => {
        sendValue(textInput.getValue());
    });
    textInput.onenter(value => {
        sendValue(value);
    });
}

const addValue = async (value) => {
    await add(spreadsheetId, "Data", {
        "Date": new Date(),
        "Weight": value
    });
    showMessage("1 row updated");    
}



gapiInitialized.then(() => {
    listLatestValues();
    makeCard();
});

