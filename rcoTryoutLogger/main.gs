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
function myFunction(e) {
  var officerDocs = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1AUtCGS0CP1nNELnSJwzkhLAF3O3SIIQKGJQTSGCYtfc/edit#gid=0");
  var database = officerDocs.getSheetByName("RCO Database");

  var response = responseFormatter.convertToDict(e.values);

  // Find the EN Section
  var enRange = database.getRange(1, 3, database.getMaxRows(), 2);
  var enRangeVals = enRange.getValues();
  var found = false;
  for (let i = 0; i < database.getMaxRows(); i++) {
    if (String(enRangeVals[i][0]) == "Sergeant" && !found) {
      console.log(`Found SGT section @ row ${i + 1}`);
      var enSectionStartIndex = i + 1;
      var enSectionEndIndex = i + 1;
      found = true;
      continue;
    } else if (String(enRangeVals[i][0]) == "Sergeant") {
      enSectionEndIndex++;
    } 
  }

  console.log(`\tRange is from ${enSectionStartIndex}-${enSectionEndIndex}`)
  var enSectionRange = database.getRange(enSectionStartIndex, 1, (enSectionEndIndex - enSectionStartIndex) + 1, database.getMaxColumns());
  var enSectionRangeVals = enSectionRange.getValues();

  var isEmptyRow = false;
  for (let i = 0; i < (enSectionEndIndex - enSectionStartIndex) + 1; i++) {
    if (enSectionRangeVals[i][1] == '') {
      console.log(`Found empty row @ ${i + enSectionStartIndex}`);
      isEmptyRow = true;
      var futureRow = database.getRange(i + enSectionStartIndex, 1, 1, database.getMaxColumns());
      var futureRowIndex = enSectionStartIndex + i;
      break;
    }
  }
  var addedRow = false;
  if (!isEmptyRow) {
    database.insertRowAfter(enSectionEndIndex);
    addedRow = true;
    var futureRow = database.getRange(enSectionEndIndex + 1, 1, 1, database.getMaxColumns());
    database.getRange(enSectionEndIndex, 1, 1, database.getMaxColumns()).copyTo(futureRow);
    var futureRowIndex = enSectionEndIndex + 1;
  }
  var futureRowVals = futureRow.getValues();
  var today = new Date();
  today = today.toLocaleDateString();
  futureRowVals[0][1] = response.cadet;
  futureRowVals[0][2] = "Sergeant";
  futureRowVals[0][3] = "NCO";
  futureRowVals[0][4] = "'";
  futureRowVals[0][5] = response["steam"];
  futureRowVals[0][6] = response["discord"];
  futureRowVals[0][7] = ``;
  futureRowVals[0][8] = `Trooper`;
  futureRowVals[0][9] = `Active`;
  futureRowVals[0][10] = "";
  futureRowVals[0][11] = today;
  futureRowVals[0][12] = `=DAYS(TODAY(), K${futureRowIndex})`;
  futureRowVals[0][13] = "";
  futureRowVals[0][14] = today;
  futureRowVals[0][15] = `=DAYS(TODAY(), N${futureRowIndex})`;
  futureRow.setValues(futureRowVals);  
}
