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
