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
 var database = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1AUtCGS0CP1nNELnSJwzkhLAF3O3SIIQKGJQTSGCYtfc/edit#gid=743146289").getSheetByName("RCO Database");
 var activityLogs = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1tErCmJnF-8GT3mSk_SlG7uTb_5OF-aGBvgbbZ7LSrkM/edit#gid=1262891684").getSheetByName("Form Responses 2");
 var activityLogsRange = activityLogs.getRange(1, 2, activityLogs.getMaxRows(), 1);
 var activityLogsRangeVals = activityLogsRange.getValues();
 var response = e.values;

 var nameRange = database.getRange(1, 2, database.getMaxRows(), 1);
 var nameRangeVals = nameRange.getValues();
 for (let i = 0; i < database.getMaxRows(); i++) {
   if (response[1] == String(nameRangeVals[i][0])) {
     nameRangeVals[i][0] = response[2];
     nameRange.setValues(nameRangeVals);
     return 0;
   }
 }
 for (let i = 0; i < activityLogs.getLastRow(); i++) {
   if (response[1] == String(activityLogsRangeVals[i][0])) {
     activityLogsRangeVals[i][0] = response[2];
     activityLogsRange.setValues(activityLogsRangeVals);
     return 0;
   }
 }
}
