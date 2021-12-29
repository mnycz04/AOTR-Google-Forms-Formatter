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

function getHierarchy(rank) {
  rank = String(rank);
  let command = ["Marshall Commander", "Commander", "Executive Officer", "Colonel"];
  let seniorOfficer = ["Lieutenant Colonel", "Major", "Captain"];
  let juniorOfficer = ["First Lieutenant", "Second Lieutenant"];
  let seniorNCO = ["Sergeant Major", "First Sergeant", "Master Sergeant", "Sergeant First Class"];
  let NCO = ["Staff Sergeant", "Sergeant"];

  if (command.includes(rank)) {
    return "Command";
  } else if (seniorOfficer.includes(rank)) {
    return "Senior Officer";
  } else if (juniorOfficer.includes(rank)) {
    return "Junior Officer";
  } else if (seniorNCO.includes(rank)) {
    return "SNCO";
  } else if (NCO.includes(rank)) {
    return "NCO";
  } else {
    throw "Bracket Not Found";
  }
}
