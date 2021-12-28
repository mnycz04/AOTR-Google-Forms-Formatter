class responseFormatter {
  static convertToDict(response) {
    var formatted = { "timestamp": response[0],
                      "officer": response[1],
                      "trooper": String(response[2]).trim(),
                      "action": response[3],
                      "oldRank": response[4],
                      "newRank": response[5]}

    return formatted;
  }
}
