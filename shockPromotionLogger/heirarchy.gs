function getHierarchy(rank) {
  rank = String(rank);
  let command = ["Commander", "Executive Officer", "Colonel"];
  let seniorOfficer = ["Lieutenant Colonel", "Major", "Captain"];
  let juniorOfficer = ["First Lieutenant", "Second Lieutenant"];
  let seniorNCO = ["Sergeant Major", "First Sergeant", "Master Sergeant", "Sergeant First Class"];
  let NCO = ["Staff Sergeant", "Sergeant"];
  let enlisted = ["Corporal", "Lance Corporal", "Specialist", "Private First Class", "Private", "Enlisted"];

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
  } else if (enlisted.includes(rank)) {
    return "Enlisted";
  } else {
    throw "Bracket Not Found";
  }
}
