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
