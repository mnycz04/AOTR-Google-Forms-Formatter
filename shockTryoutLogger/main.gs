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
  var database = officerDocs.getSheetByName("Shock Database");

  var response = responseFormatter.convertToDict(e.values);

  // Find the EN Section
  var enRange = database.getRange(1, 3, database.getMaxRows(), 1);
  var enRangeVals = enRange.getValues();
  var found = false;
  for (let i = 0; i < database.getMaxRows(); i++) {
    if (String(enRangeVals[i]) == "Enlisted" && !found) {
      console.log(`Found EN section @ row ${i + 1}`);
      var enSectionStartIndex = i + 1;
      var enSectionEndIndex = i + 1;
      found = true;
      continue;
    } else if (String(enRangeVals[i]) == "Enlisted") {
      enSectionEndIndex = i + 1;
    }
  }

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
  futureRowVals[0][1] = response["trooper"];
  futureRowVals[0][2] = "Enlisted";
  futureRowVals[0][3] = "Enlisted";
  futureRowVals[0][4] = "'";
  futureRowVals[0][5] = response["steamid"];
  futureRowVals[0][6] = response["discordid"];
  futureRowVals[0][7] = `[ST-${response["ct"]}]`;
  futureRowVals[0][8] = `Trooper`;
  futureRowVals[0][9] = `=activity(B${futureRowIndex}, $A$1)`;
  futureRowVals[0][10] = "";
  futureRowVals[0][11] = today;
  futureRowVals[0][12] = `=DAYS(TODAY(), L${futureRowIndex})`;
  futureRowVals[0][13] = "";
  futureRowVals[0][14] = today;
  futureRowVals[0][15] = `=DAYS(TODAY(), O${futureRowIndex})`;
  futureRow.setValues(futureRowVals);

  // Add to EN-SGT Checklist
  var checklist = officerDocs.getSheetByName("Shock EN-SGT Checklist")
  var checklistRange = checklist.getRange(1, 2, checklist.getLastRow()+1, 1);
  var checklistRangeVals = checklistRange.getValues();
  console.log(checklistRangeVals)
  for (let i = 0; i < checklist.getLastRow(); i++) {
    if (String(checklistRangeVals[i][0]) == '') {
      checklistRangeVals[i][0] = response.trooper
      checklistRange.setValues(checklistRangeVals);
      break;
    }
  }


  if (addedRow) {
    let trainingSheet = officerDocs.getSheetByName("Shock Trainings");
    let validRanks = "High Command, Colonel, Major, Captain, First Lieutenant, Second Lieutenant, Sergeant Major, First Sergeant, Master Sergeant, Sergeant First Class, Staff Sergeant, Sergeant,    Corporal, Lance Corporal, Specialist, Private First Class, Private, Enlisted";
    let trainingSheetNameColumn = trainingSheet.getRange(1, 2, trainingSheet.getMaxRows(), 1);
    for (let i = 0; i < trainingSheet.getMaxRows(); i++) {
      if (trainingSheetNameColumn.getValues()[i] == "Enlisted") {
        var trainingRankbracketRow = i + 1; 
        break;
      }
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
      if (promoProgressColumn.getValues()[i] == "Enlisted") {
        var promoRankBracketStartRow = i + 1;
        break;
      }
    }
    var promoRankBracketEndRowIndex = 0
    for (let i = promoRankBracketStartRow + 1; i < promoProgressSheet.getMaxRows(); i++) {
      if (validRanks.includes(String(promoProgressColumn.getValues()[i]))) {
        promoRankBracketEndRowIndex = i;
      }
      else {
        break;
      }
    }
    console.log(`PromoProg Range goes from ${promoRankBracketStartRow}-${promoRankBracketEndRowIndex}`)
    console.log(promoProgressColumn.getValues());

    promoProgressSheet.insertRowAfter(promoRankBracketEndRowIndex);
    let newPromoRow = promoProgressSheet.getRange(promoRankBracketEndRowIndex + 1, 1, 1, promoProgressSheet.getMaxColumns())
    promoProgressSheet.getRange(promoRankBracketEndRowIndex, 1, 1, promoProgressSheet.getMaxColumns()).copyTo(newPromoRow);
    return 0;
  } else {
    return 0;
  }

  
}
