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
 var response = e.values;

 var nameRange = database.getRange(1, 2, database.getMaxRows(), 1);
 var nameRangeVals = nameRange.getValues();
 for (let i = 0; i < database.getMaxRows(); i++) {
   if (response[2] == String(nameRangeVals[i][0])) {
     var officerIndex = i + 1;
     console.log(`Found person @ row ${officerIndex}`)
     break;
   }
 }

 var officerRow = database.getRange(officerIndex, 1, 1, database.getMaxColumns());
 var officerRowVals = officerRow.getValues();

 officerRowVals[0][1] = "";
 officerRowVals[0][4] = "'";
 officerRowVals[0][5] = "";
 officerRowVals[0][6] = "";
 officerRowVals[0][7] = "";
 officerRowVals[0][8] = "Trooper";
 officerRowVals[0][9] = `Active`;
 officerRowVals[0][11] = "";
 officerRowVals[0][12] = "";
 officerRowVals[0][14] = "";
 officerRowVals[0][15] = "";
 officerRow.setValues(officerRowVals);
 return 0;
}
