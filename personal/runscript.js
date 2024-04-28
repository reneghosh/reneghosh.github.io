import { Card } from "./cardmaker.js";
import { add, getColumnNames, getDatabaseRange, makeUUID } from "./sheetserver.js";

const spreadsheetId = "1y07XiaPGH6ihyTo7yfmFXISCt3g1H2zrBMaOTMdjCW0";
var numResults = 0;
var inputRange;

const log = console.log;

// for (let i=0;i<10;i++){
//     console.log(makeUUID())
// }

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
    tr.innerHTML = "<th>Date</th><th>Distance</th><th>Temps</th>";
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
                appendData([row[1], row[2], row[3], row[4]]);
            }
        } else {
            showScriptError("no data");
            console.log("no data")
        }
    } catch (err) {
        showScriptError('Error: ' + err);
        console.log("error ",e)
    };
}


const makeCard = () => {
    const sendValue = (value) => {
        addValue(value);
    }
    const card = new Card("card");
    const distanceInput = card.addTextInput("Distance:", { focused: true, inputType: "number" });
    distanceInput.setValue(4.00);
    const hoursInput = card.addTextInput("Hours:", { inputType: "number" });
    hoursInput.setValue(0);
    const minutesInput = card.addTextInput("Minutes:", { inputType: "number" });
    minutesInput.setValue(24);
    const secondsInput = card.addTextInput("Seconds:", { inputType: "number" });
    secondsInput.setValue(0);
    const actionList = card.addActions();
    const action = actionList.addAction("Add to sheet");
    action.onclick(() => {
        sendValue({Distance: distanceInput.getValue(), Temps: `${hoursInput.getValue()}:${minutesInput.getValue()}:${secondsInput.getValue()}`});
    });
}

const addValue = async (value) => {
    let record = {
        "ID": makeUUID(),
        "date": new Date().toLocaleDateString("fr-FR"),
        "Distance": value.Distance,
        "Temps": value.Temps
    };
    // console.log(record)
    await add(spreadsheetId, "Data", record);
    showMessage("1 row updated");
    listLatestValues();
}



gapiInitialized.then(() => {
    listLatestValues();
    makeCard();
});
