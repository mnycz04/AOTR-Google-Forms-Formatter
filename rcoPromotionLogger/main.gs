/* Copyright 2021 Michael Nycz
*
* This file is part of AOTR Google Forms Formatter ("Program").
*
*  Program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   Program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
*/
function onResponse(response) {
  var officerDocs = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1AUtCGS0CP1nNELnSJwzkhLAF3O3SIIQKGJQTSGCYtfc/edit#gid=0");
  var database = officerDocs.getSheetByName('RCO Database');

  response = responseFormatter.convertToDict(response.values);

  // Find Future Rank Bracket
  var newHierarchy = getHierarchy(response["newRank"]);
  var hierarchyRange = database.getRange(1, 4, database.getMaxRows(), 1);
  var hierarchyRangeValues = hierarchyRange.getValues();
  var found = false
  for (let i = 0; i < database.getMaxRows(); i++) {
    if ((String(hierarchyRangeValues[i]) == newHierarchy) && !found) {
      console.log(`Found hierachy start at row ${i + 1}`);
      var hierachyStart = i + 1;
      var hierachyEnd = i + 1;
      found = true;
      continue;
    }
    if ((String(hierarchyRangeValues[i]) == newHierarchy) && found) {
      hierachyEnd = i + 1;
    }
  }
  hierarchyRange = database.getRange(hierachyStart, 1, (hierachyEnd - hierachyStart) + 1, database.getMaxColumns()); // A range of all rows in the hiercarchy, and all columns
  hierarchyRangeValues = hierarchyRange.getValues();

  // Gets Range for New Rank
  found = false;
  for (let i = 0; i < hierarchyRangeValues.length; i++) {
    if (String(hierarchyRangeValues[i][2]) == response["newRank"] && !found) {
      console.log(`Found Rank Bracket start at row ${i + hierachyStart}`);
      var rankStart = hierachyStart + i;
      var rankEnd = hierachyStart + i;
      found = true;
      continue;
    }
    if ((String(hierarchyRangeValues[i][2]) == response["newRank"]) && found) {
      rankEnd = hierachyStart + i;
    }
  }
  console.log(`Rank Range goes from ${rankStart} to ${rankEnd}`);
  var rankRange = database.getRange(rankStart, 1, (rankEnd - rankStart) + 1, database.getMaxColumns());
  var rankRangeValues = rankRange.getValues();
  console.log(rankEnd);

  var futureRowIndex = 0;
  // Now checkin g if there is already an empty row in the desired rank bracket
  var isEmptyRow = false;
  for (let i = 0; i < (rankEnd - rankStart) + 1; i++) {
    if (rankRangeValues[i][1] == '') {
      console.log(`Found empty row @ ${i + rankStart}`);
      isEmptyRow = true;
      var futureRow = database.getRange(i + rankStart, 1, 1, database.getMaxColumns());
      futureRowIndex = rankStart + i;
      break;
    }
  }
  var addedRow = false;
  if (!isEmptyRow) {
    database.insertRowAfter(rankEnd);
    addedRow = true;
    var futureRow = database.getRange(rankEnd + 1, 1, 1, database.getMaxColumns());
    database.getRange(rankEnd, 1, 1, database.getMaxColumns()).copyTo(futureRow);
    futureRowIndex = rankEnd + 1;
  }
  
  var futureRowVals = futureRow.getValues();
  console.log(futureRowVals);
  futureRowVals[0][1] = "TEMP";
  futureRowVals[0][4] = "'";
  futureRowVals[0][5] = "TEMP";
  futureRowVals[0][6] = "TEMP";
  futureRowVals[0][7] = "TEMP";
  futureRowVals[0][10] = "TEMP";
  futureRowVals[0][11] = "TEMP";
  futureRowVals[0][13] = "TEMP";
  futureRowVals[0][14] = "TEMP";
  futureRowVals[0][15] = "TEMP";
  futureRow.setValues(futureRowVals);

  // Look for the troopers previous row
  var oldRow = database.getRange(1, 2, database.getMaxRows(), 1);
  var oldRowValues = oldRow.getValues();
  for (let i = 0; i < database.getMaxRows(); i++) {
    if (String(oldRowValues[i]).toUpperCase() == response["trooper"].toUpperCase()) {
      var oldRowIndex = i + 1;
      oldRow = database.getRange(oldRowIndex, 1, 1, database.getMaxColumns());
      oldRowValues = oldRow.getValues();
      break;
    }
  }
   var today = new Date();
   today = today.toLocaleDateString();
  oldRowValues[0][2] = response["newRank"];
  oldRowValues[0][3] = newHierarchy;
  oldRowValues[0][12] = `=DAYS(TODAY(), K${futureRowIndex})`
  oldRowValues[0][9] = `Active`;
  oldRowValues[0][14] = today;
  oldRowValues[0][15] = `=DAYS(TODAY(), N${futureRowIndex})`;
  futureRow.setValues(oldRowValues);
  
  oldRowValues = oldRow.getValues();
  oldRowValues[0][1] = "";
  oldRowValues[0][4] = "'";
  oldRowValues[0][5] = "";
  oldRowValues[0][6] = "";
  oldRowValues[0][7] = "";
  oldRowValues[0][8] = "Trooper";
  oldRowValues[0][9] = `Vacant`;
  oldRowValues[0][10] = "";
  oldRowValues[0][11] = "";
  oldRowValues[0][12] = "";
  oldRowValues[0][13] = "";
  oldRowValues[0][15] = "";
  oldRow.setValues(oldRowValues);


}
