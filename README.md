# AOTR Google Forms Formatter
Built for AOTR - Automatic google forms response processor &amp; formatter


## Summary
This project is designed to be used in Google Apps & Scripts (https://script.google.com/), and to be linked with a non-formatted Google Sheet that accepts Google Form responses.
Furthermore, this requires a link to a valid central spreadsheet, often denoted by the variable name `officerDocs` or `database`. This is required as without this spreadsheet to output data to, this projects purpose becomes moot.

# Set-up & Use

## Setting up an Enviroment
To start, you should have a Google Form linked to a Google Sheet; from that sheet, you should link a Google Apps Script (Can be done by using the `Script Editor` under the `Extensions` menu folder in Google Sheets)
Once inside this folder, you will be opened to a new project. In this workspace is where you'll upload the respective source files too.

## Setting up a trigger
In the workspace used above, go to the menu titled `Triggers`, and add a trigger that runs `myFunction` that uses `This Spreadsheet` and is triggered `on form submit`.

## Notes on future use
This product was devloped without the idea for future use, and therefore does not tolerate edge-cases well. Furthermore, a specific layout is required for the main spreadsheet, which can only be changed by editing the source code.
