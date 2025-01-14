const log = console.log;

export function makeUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


//get the sheet full database range
export async function getDatabaseRange(sheetId, sheetName) {
    let response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: sheetName,
    });
    let databaseValues = response.result.values;
    //max columns and max rows to determine the database range  
    let maxRows = databaseValues.length;
    let maxColumns = maxRows > 0 ? databaseValues[0].length : 0;
    let trimmedTable = [];
    var newMaxColumns = 0;
    for (let i = 0; i < databaseValues.length; i++) {
        let row = databaseValues[i];
        if (row.length == 0 || row[0] == "") {
            break;
        }
        if (newMaxColumns == 0) {
            for (let j = 0; j < row.length; j++) {
                if (row[j] != "") {
                    newMaxColumns++;
                }
            }
        }
        trimmedTable.push(row.slice(0, newMaxColumns));
    }
    return trimmedTable;
}

//get sheet columns
export function getColumnNames(range) {
    let numRows = range.length;
    if (numRows >= 1) {
        //read the first row to determine the column names
        var columnNames = [];
        for (let i = 0; i < range[0].length; i++) {
            let potentialColumnName = range[0][i];
            if (potentialColumnName != undefined && potentialColumnName != "") {
                columnNames.push(potentialColumnName);
            }
        }
        return columnNames;
    }
    return [];
}

function valuesAsMap(range) {
    let columns = getColumnNames(range);
    let values = range;
    var myMap = {};
    for (let row of values) {
        let valueObject = {}
        for (let [index, col] of Object.entries(columns)) {
            valueObject[col] = row[index];
        }
        myMap[row[0]] = valueObject;
    }
    return myMap;
}
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function numberToLetter(number) {
    var left = number;
    var d1 = 0;
    var d0 = 0;
    while (left > 0) {
        if (left >= 26) {
            left -= 26;
            d1++;
        } else {
            d0 = left;
            left = 0;
        }
    }
    return (d1 > 0 ? letters[d1 - 1] : "") + letters[d0 - 1];
}

export async function add(sheetId, sheetName, values) {
    let range = await getDatabaseRange(sheetId, sheetName);
    let numRows = range.length;
    let columns = getColumnNames(range);
    values[columns[0]] = makeUUID();
    let updateObject = new Array(Object.keys(values).length + 1);
    for (let [item, value] of Object.entries(values)) {
        let columnIndex = columns.findIndex(name => name == item);
        if (columnIndex >= 0) {
            updateObject[columnIndex] = value;
        }
    }
    let response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: sheetName + "!A" + (range.length + 1) + ":" + numberToLetter(updateObject.length) + (range.length + 1),
        valueInputOption: "USER_ENTERED",
        resource: {
            majorDimension: "ROWS",
            values: [updateObject]
        }
    });
    log(response);
    return 1;
}

export async function update(sheetId, sheetName, id, values) {
    let range = await getDatabaseRange(sheetId, sheetName);
    let columns = getColumnNames(range);
    let updateObject = new Array(Object.keys(values).length + 1);
    for (let [item, value] of Object.entries(values)) {
        let columnIndex = columns.findIndex(name => name == item);
        if (columnIndex >= 0) {
            updateObject[columnIndex] = value;
        }
    }
    for (let [index, row] of Object.entries(range)) {
        if (row[0] == id) {
            let response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: sheetName + "!A" + (index + 1) + ":" + numberToLetter(updateObject.length) + (index + 1),
                valueInputOption: "USER_ENTERED",
                resource: {
                    majorDimension: "ROWS",
                    values: [updateObject]
                }
            });
            return 1;
        }
    }
    return 0;
}

//delete a row entry
export async function deleteEntry(databaseName, id) {
    let range = await getDatabaseRange(sheetId, sheetName);

    for (let [index, row] of Object.entries(range)) {
        if (row[0] == id) {
            let response = await gapi.client.sheets.spreadsheets.values.clear({
                spreadsheetId: sheetId,
                clearedRange: sheetName + "!A" + (index + 1) + ":" + numberToLetter(updateObject.length) + (index + 1),
            });
            log(response);

        }
    }
}
