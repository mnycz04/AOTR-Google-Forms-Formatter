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
  var response = responseFormatter.convertToDict(e.values);
  console.log(`Removing "${response["trooper"]}"`)

  var officerDocs = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1AUtCGS0CP1nNELnSJwzkhLAF3O3SIIQKGJQTSGCYtfc/edit#gid=0");
  var roster = officerDocs.getSheetByName("Shock Database");

  var nameRange = roster.getRange(1, 2, roster.getMaxRows(), 1);
  var nameRangeVals = nameRange.getValues();

  for (let i = 0; i < roster.getMaxRows(); i++) {
    console.log(nameRangeVals[i][0]);
    if (String(nameRangeVals[i][0]) == response["trooper"]) {
      var trooperRowIndex = i + 1;
      break;
    }
  }

  var trooperRow = roster.getRange(trooperRowIndex, 1, 1, roster.getMaxColumns());
  var trooperRowVals = trooperRow.getValues();
  trooperRowVals[0][1] = "";
  trooperRowVals[0][4] = "'";
  trooperRowVals[0][5] = "";
  trooperRowVals[0][6] = "";
  trooperRowVals[0][7] = "";
  trooperRowVals[0][8] = "Trooper";
  trooperRowVals[0][9] = `=activity(B${trooperRowIndex}, $A$1)`;
  trooperRowVals[0][11] = "";
  trooperRowVals[0][12] = "";
  trooperRowVals[0][14] = "";
  trooperRowVals[0][15] = "";
  trooperRow.setValues(trooperRowVals);

  var officerdoctrainingLogs = officerDocs.getSheetByName("Shock Training Logs");

  var officerdoctrainingLogsRange = officerdoctrainingLogs.getRange(1, 7, officerdoctrainingLogs.getLastRow(), 1);
  var officerdoctrainingLogsRangeVals = officerdoctrainingLogsRange.getValues();

  for (let i = 0; i < officerdoctrainingLogsRange.getLastRow(); i++) {
    officerdoctrainingLogsRangeVals[i][0] = String(officerdoctrainingLogsRangeVals[i][0]).replace(response.trooper, "");
  }
  officerdoctrainingLogsRange.setValues(officerdoctrainingLogsRangeVals);


  var trainingLogs = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1AvpSX9FdZ66Y6prT-d7G57i-0zOFU7xA-mLzlwqmKvo/edit#gid=1248705714').getSheetByName('Responses');
  var trainingLogsRange1 = trainingLogs.getRange(1, 2, trainingLogs.getLastRow(), 1);
  var trainingLogsRange1Vals = trainingLogsRange1.getValues();
  for (let i=0; i<trainingLogsRange1.getLastRow(); i++) {
    trainingLogsRange1Vals[i][0] = String(trainingLogsRange1Vals[i][0]).replace(response.trooper, "");
  }
  trainingLogsRange1.setValues(trainingLogsRange1Vals);

  var trainingLogsRange2 = trainingLogs.getRange(1, 5, trainingLogs.getLastRow(), 1);
  var trainingLogsRange2Vals = trainingLogsRange2.getValues();
  for (let i=0; i<trainingLogs.getLastRow(); i++) {
    trainingLogsRange2Vals[i][0] = String(trainingLogsRange2Vals[i][0]).replace(response.trooper, "");
  }
  trainingLogsRange2.setValues(trainingLogsRange2Vals);

  var enChecklist = officerDocs.getSheetByName("Shock EN-SGT Checklist");
  var enChecklistNameRange = enChecklist.getRange(1, 2, enChecklist.getMaxRows(), 1);
  var enChecklistNameRangeVals = enChecklistNameRange.getValues();

  for (let i = 0; i < enChecklist.getMaxRows(); i++) {
    if (String(enChecklistNameRangeVals[i][0]) == response.trooper) {
      let row = enChecklist.getRange(i + 1, 1, 1, enChecklist.getMaxColumns());
      let rowVals = row.getValues();
      rowVals[0][1] = ""
      rowVals[0][5] = false
      rowVals[0][6] = false
      rowVals[0][7] = false
      rowVals[0][8] = false
      rowVals[0][9] = false
      rowVals[0][10] = false
      row.setValues(rowVals);
      break
    }
  }


  var ncoChecklist = officerDocs.getSheetByName("Shock SGT-SGM Checklist");
  var ncoChecklistNameRange = ncoChecklist.getRange(1, 2, ncoChecklist.getMaxRows(), 1);
  var ncoChecklistNameRangeVals = ncoChecklistNameRange.getValues();

  for (let i = 0; i < ncoChecklist.getMaxRows(); i++) {
    if (String(ncoChecklistNameRangeVals[i][0]) == response.trooper) {
      let row = ncoChecklist.getRange(i + 1, 1, 1, ncoChecklist.getMaxColumns());
      let rowVals = row.getValues();
      rowVals[0][1] = ""
      rowVals[0][5] = false
      rowVals[0][6] = false
      rowVals[0][7] = false
      rowVals[0][8] = false
      rowVals[0][9] = false
      rowVals[0][10] = false
      rowVals[0][11] = false
      rowVals[0][12] = false
      row.setValues(rowVals);
      break
    }
  }
}
