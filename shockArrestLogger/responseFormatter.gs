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
class responseFormatter {
  static convertToDict(response) {
    var formatted = { "timestamp": response[0],
                      "arrestingOfficer": response[1],
                      "arrestee": response[2],
                      "penalCode": String(response[3]).toUpperCase(),
                      "punishment": response[4],
                      "context": response[5]}

    return formatted;
  }
}
