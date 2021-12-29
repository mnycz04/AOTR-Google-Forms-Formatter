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
  var database = officerDocs.getSheetByName('Shock Database');

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
  // Now checking if there is already an empty row in the desired rank bracket
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
  futureRowVals[0][11] = "TEMP";
  futureRowVals[0][12] = "TEMP";
  futureRowVals[0][14] = "TEMP";
  futureRowVals[0][15] = "TEMP";
  futureRow.setValues(futureRowVals);

  // Look for the troopers previous row
  var oldRow = database.getRange(1, 2, database.getMaxRows(), 1);
  var oldRowValues = oldRow.getValues();
  for (let i = 0; i < database.getMaxRows(); i++) {
    if (String(oldRowValues[i]) == response["trooper"]) {
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
  oldRowValues[0][9] = `=activity(B${futureRowIndex}, $A$1)`
  oldRowValues[0][12] = `=DAYS(TODAY(), L${futureRowIndex})`
  oldRowValues[0][14] = today;
  oldRowValues[0][15] = `=DAYS(TODAY(), O${futureRowIndex})`;
  futureRow.setValues(oldRowValues);
  
  oldRowValues = oldRow.getValues();
  oldRowValues[0][1] = "";
  oldRowValues[0][4] = "'";
  oldRowValues[0][5] = "";
  oldRowValues[0][6] = "";
  oldRowValues[0][7] = "";
  oldRowValues[0][8] = "Trooper";
  oldRowValues[0][9] = `=activity(B${oldRowIndex}, $A$1)`;
  oldRowValues[0][11] = "";
  oldRowValues[0][12] = "";
  oldRowValues[0][14] = "";
  oldRowValues[0][15] = "";
  oldRow.setValues(oldRowValues);

  if (response["oldRank"] == "Corporal" && response["action"] == "Promotion") {
    let enChecklist = officerDocs.getSheetByName("Shock EN-SGT Checklist");
    let enChecklistNames = enChecklist.getRange(1, 2, enChecklist.getLastRow(), 1);
    let checlistNamesVals = enChecklistNames.getValues();
    for (let i = 0; i < enChecklist.getLastRow(); i++) {
      if (String(checlistNamesVals[i][0]) == response.trooper){
        var enChecklistIndex = i + 1;
      }
    }
    console.log(`Editted checlist at row ${enChecklistIndex}`)

    let enChecklistRow = enChecklist.getRange(enChecklistIndex, 1, 1, 11);
    let enChecklistRowValues = enChecklistRow.getValues();

    enChecklistRowValues[0][1] = "";
    enChecklistRowValues[0][3] = `=IF(AND(F${enChecklistIndex}:J${enChecklistIndex}), "Yes", "No")`;
    enChecklistRowValues[0][5] = false;
    enChecklistRowValues[0][6] = false;
    enChecklistRowValues[0][7] = false;
    enChecklistRowValues[0][8] = false;
    enChecklistRowValues[0][9] = false;
    enChecklistRowValues[0][10] = false;
    enChecklistRow.setValues(enChecklistRowValues);

    let ncocheck = officerDocs.getSheetByName("Shock SGT-SGM Checklist");
    let ncocheckrange = ncocheck.getRange(1, 2, ncocheck.getMaxRows(), 1);
    let ncocheckrangevals = ncocheckrange.getValues()

    for (let i = 0; i < ncocheck.getMaxRows(); i++) {
      if (ncocheckrangevals[i][0] == "") {
        let theRow = ncocheck.getRange(i+1, 1, 1, ncocheck.getMaxColumns());
        let theRowVals = theRow.getValues()
        theRowVals[0][1] = response.trooper
        theRowVals[0][3] = `=IF(AND(F${i+1}:M${i+1}), "Yes", "No")`
        theRow.setValues(theRowVals)
        console.log(`Editted checklist at row ${i+1}`)
        break;
      }
    }
  }

  if (response["oldRank"] == "First Sergeant" && response["action"] == "Promotion") {
    let ncoChecklist = officerDocs.getSheetByName("Shock SGT-SGM Checklist");
    let ncoChecklistNames = ncoChecklist.getRange(1, 2, ncoChecklist.getLastRow(), 1);
    let ncocheclistNamesVals = ncoChecklistNames.getValues();
    for (let i = 0; i < ncoChecklist.getLastRow(); i++) {
      if (String(ncocheclistNamesVals[i][0]) == response.trooper){
        var ncoChecklistIndex = i + 1;
      }
    }
    console.log(`Editted checklist at row ${ncoChecklistIndex}`)

    let ncoChecklistRow = ncoChecklist.getRange(ncoChecklistIndex, 1, 1, 13);
    let ncoChecklistRowValues = ncoChecklistRow.getValues();

    ncoChecklistRowValues[0][1] = "";
    ncoChecklistRowValues[0][3] = `=IF(AND(F${ncoChecklistIndex}:M${ncoChecklistIndex}), "Yes", "No")`;
    ncoChecklistRowValues[0][5] = false;
    ncoChecklistRowValues[0][6] = false;
    ncoChecklistRowValues[0][7] = false;
    ncoChecklistRowValues[0][8] = false;
    ncoChecklistRowValues[0][9] = false;
    ncoChecklistRowValues[0][10] = false;
    ncoChecklistRowValues[0][11] = false;
    ncoChecklistRowValues[0][12] = false;
    ncoChecklistRow.setValues(ncoChecklistRowValues);
  }

  if (addedRow) {
    if (response["newRank"] == "Executive Officer") {
      let trainingSheet = officerDocs.getSheetByName("Shock Trainings");
      let trainingSheetNameColumn = trainingSheet.getRange(1, 2, trainingSheet.getMaxRows(), 1);
      for (let i=0; i<trainingSheet.getMaxRows(); i++) {
        if (String(trainingSheetNameColumn.getValues()[i]) == "Colonel") {
          trainingSheet.insertRowAfter(i);
          trainingSheet.getRange(i, 1, 1, trainingSheet.getMaxColumns()).copyTo(
            trainingSheet.getRange(i+1, 1, 1, trainingSheet.getMaxColumns())
          );
          return 0;
        }
      }

    }
    let trainingSheet = officerDocs.getSheetByName("Shock Trainings");
    let validRanks = "High Command, Colonel, Lieutenant Colonel, Major, Captain, First Lieutenant, Second Lieutenant, Sergeant Major, First Sergeant, Master Sergeant, Sergeant First Class, Staff Sergeant, Sergeant,    Corporal, Lance Corporal, Specialist, Private First Class, Private, Enlisted";
    let trainingSheetNameColumn = trainingSheet.getRange(1, 2, trainingSheet.getMaxRows(), 1);
    for (let i = 0; i < trainingSheet.getMaxRows(); i++) {
      if (trainingSheetNameColumn.getValues()[i] == response["newRank"]) {
        var trainingRankbracketRow = i + 1; 
        break;
      }
      console.log(trainingSheetNameColumn.getValues()[i]);
    }
    for (let i = trainingRankbracketRow + 1; i < trainingSheet.getMaxRows(); i++) {
      if (validRanks.includes(String(trainingSheetNameColumn.getValues()[i]))) {
        var trainingRankbracketRowEnd = trainingSheet.getRange(i, 1, 1, trainingSheet.getMaxColumns());
        var trainingRankbracketRowEndIndex = i;
        break;
      }
    }

    trainingSheet.insertRowAfter(trainingRankbracketRowEndIndex);
    let newTrainingRow = trainingSheet.getRange(trainingRankbracketRowEndIndex + 1, 1, 1, trainingSheet.getMaxColumns());
    trainingSheet.getRange(trainingRankbracketRowEndIndex-1, 1, 1, trainingSheet.getMaxColumns()).copyTo(newTrainingRow);

    let promoProgressSheet = officerDocs.getSheetByName("Shock Promotion Progress");
    let promoProgressColumn = promoProgressSheet.getRange(1, 3, promoProgressSheet.getMaxRows(), 1);
    for (let i = 0; i < promoProgressSheet.getMaxRows(); i++) {
      if (promoProgressColumn.getValues()[i] == response["newRank"]) {
        var promoRankBracketStartRow = i + 1;
        break;
      }
    }
    for (let i = promoRankBracketStartRow - 1; i < promoProgressSheet.getMaxRows(); i++) {
      if (String(promoProgressColumn.getValues()[i]) == response["newRank"]) {
        var promoRankBracketEndRowIndex = 1 + i;
      } else {
        break;
      }
    }

    promoProgressSheet.insertRowAfter(promoRankBracketEndRowIndex);
    let newPromoRow = promoProgressSheet.getRange(promoRankBracketEndRowIndex + 1, 1, 1, promoProgressSheet.getMaxColumns())
    promoProgressSheet.getRange(promoRankBracketEndRowIndex, 1, 1, promoProgressSheet.getMaxColumns()).copyTo(newPromoRow);
    console.log(`The new row is at ${promoRankBracketEndRowIndex + 1}`)
    return 0;
  } else {
    return 0;
  }
}
