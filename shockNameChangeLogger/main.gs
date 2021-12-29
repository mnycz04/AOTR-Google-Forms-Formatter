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
  console.log(`Replacing "${response["oldName"]}" with "${response["newName"]}"`)

  var officerDocs = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1AUtCGS0CP1nNELnSJwzkhLAF3O3SIIQKGJQTSGCYtfc/edit#gid=0");
  var roster = officerDocs.getSheetByName("Shock Database");

  var nameRange = roster.getRange(1, 2, roster.getMaxRows(), 1);
  var nameRangeVals = nameRange.getValues();

  for (let i = 0; i < roster.getMaxRows(); i++) {
    console.log(nameRangeVals[i][0]);
    if (String(nameRangeVals[i][0]) == response["oldName"]) {
      nameRangeVals[i][0] = response.newName;
      nameRange.setValues(nameRangeVals);
      console.log("Replaced Roster")
      break;
    }
  }

  var officerdoctrainingLogs = officerDocs.getSheetByName("Shock Training Logs");

  var officerdoctrainingLogsRange = officerdoctrainingLogs.getRange(1, 7, officerdoctrainingLogs.getLastRow(), 1);
  var officerdoctrainingLogsRangeVals = officerdoctrainingLogsRange.getValues();

  for (let i = 0; i < officerdoctrainingLogsRange.getLastRow(); i++) {
    officerdoctrainingLogsRangeVals[i][0] = String(officerdoctrainingLogsRangeVals[i][0]).replace(response.oldName, response.newName);
  }
  officerdoctrainingLogsRange.setValues(officerdoctrainingLogsRangeVals);


  var trainingLogs = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1AvpSX9FdZ66Y6prT-d7G57i-0zOFU7xA-mLzlwqmKvo/edit#gid=1248705714').getSheetByName('Responses');
  var trainingLogsRange1 = trainingLogs.getRange(1, 2, trainingLogs.getLastRow(), 1);
  var trainingLogsRange1Vals = trainingLogsRange1.getValues();
  for (let i=0; i<trainingLogsRange1.getLastRow(); i++) {
    trainingLogsRange1Vals[i][0] = String(trainingLogsRange1Vals[i][0]).replace(response.oldName, response.newName);
  }
  trainingLogsRange1.setValues(trainingLogsRange1Vals);

  var trainingLogsRange2 = trainingLogs.getRange(1, 5, trainingLogs.getLastRow(), 1);
  var trainingLogsRange2Vals = trainingLogsRange2.getValues();
  for (let i=0; i<trainingLogs.getLastRow(); i++) {
    trainingLogsRange2Vals[i][0] = String(trainingLogsRange2Vals[i][0]).replace(response.oldName, response.newName);
  }
  trainingLogsRange2.setValues(trainingLogsRange2Vals);

  var activityLogs = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1tErCmJnF-8GT3mSk_SlG7uTb_5OF-aGBvgbbZ7LSrkM/edit#gid=1262891684").getSheetByName("Form Responses 2");
  var activityLogsRange = activityLogs.getRange(1, 2, activityLogs.getLastRow(), 1);
  var activityLogsRangeVals = activityLogsRange.getValues();

  for (let i = 0; i < activityLogs.getLastRow(); i++) {
    activityLogsRangeVals[i][0] = String(activityLogsRangeVals[i][0]).replace(response.oldName, response.newName);
  }
  activityLogsRange.setValues(activityLogsRangeVals);


  var enChecklist = officerDocs.getSheetByName("Shock EN-SGT Checklist")
  var enChecklistRange = enChecklist.getRange(1, 2, enChecklist.getMaxRows(), 1);
  var enChecklistRangeVals = enChecklistRange.getValues()

  for (let i =0; i < enChecklist.getMaxRows(); i++) {
    enChecklistRangeVals[i][0] = String(enChecklistRangeVals[i][0]).replace(response.oldName, response.newName)
  }

  enChecklistRange.setValues(enChecklistRangeVals)

  var ncoChecklist = officerDocs.getSheetByName("Shock SGT-SGM Checklist")
  var ncoChecklistRange = ncoChecklist.getRange(1, 2, ncoChecklist.getMaxRows(), 1);
  var ncoChecklistRangeVals = ncoChecklistRange.getValues()

  for (let i =0; i < ncoChecklist.getMaxRows(); i++) {
    ncoChecklistRangeVals[i][0] = String(ncoChecklistRangeVals[i][0]).replace(response.oldName, response.newName)
  }

  ncoChecklistRange.setValues(ncoChecklistRangeVals)

  var officerdocPromotionLogs = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/113sc_vnD5K5diEoSrwJbgl1j8sTmOG_7SfnBSEKdD1s/edit#gid=1043844476").getSheetByName("Form Responses 1");

  var officerdocPromotionLogsRange = officerdocPromotionLogs.getRange(1, 3, officerdocPromotionLogs.getLastRow(), 1);
  var officerdocPromotionLogsRangeVals = officerdocPromotionLogsRange.getValues();

  for (let i = 0; i < officerdocPromotionLogsRange.getLastRow(); i++) {
    officerdocPromotionLogsRangeVals[i][0] = String(officerdocPromotionLogsRangeVals[i][0]).replace(response.oldName, response.newName);
  }
  officerdocPromotionLogsRange.setValues(officerdocPromotionLogsRangeVals);
}
