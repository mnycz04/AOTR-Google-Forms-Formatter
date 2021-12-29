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

  var warrantDatabase = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1tihDbHa5upbIXFZTe-cM8MDHMAmwouoep1BYg1o82Bk/edit#gid=0");
  var arrestLog = warrantDatabase.getSheetByName("Arrest History");

  arrestLog.insertRowAfter(2);
  var newRow = arrestLog.getRange(3, 2, 1, 6);
  newRow.setBackground("#FFFFFF");
  newRow.setFontColor("#000000")

  var vals = newRow.getValues();

  vals[0][0] = response.timestamp;
  vals[0][1] = response.arrestingOfficer;
  vals[0][2] = response.arrestee;
  vals[0][3] = response.penalCode;
  vals[0][4] = response.punishment;
  vals[0][5] = response.context;

  newRow.setValues(vals);
}
