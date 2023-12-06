const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {   
    console.log(part1(data));
    console.log(part2(data));
  })

const part1 = data => {
  data = data.split("\n").map(row => row
    .split(":")[1]
    .split(/\s+/)
    .filter(item => item)
    .map(item => parseInt(item)));

  const recordBreakingDistances = {};
  for (let i = 0; i < data[0].length; i++) {
    const time = data[0][i];
    const recordDistance = data[1][i];
    let chargedTime = 0;

    // Iterate over the time, check whether the current chargedTime is enough to break the record
    for (let j = 0; j < time; j++) {
      const remainingTime = time - j;
      const distance = chargedTime * remainingTime;
      chargedTime++;
      if (distance > recordDistance) {
        recordBreakingDistances[i] ? recordBreakingDistances[i]++ : recordBreakingDistances[i] = 1;
      }
    }
  }
  return Object.values(recordBreakingDistances).reduce((acc, curr) => acc * curr, 1);
}

const part2 = data => {
  data = data.split("\n").map(row => row.split(":")[1].replaceAll(" ", ""));
  const time = parseInt(data[0]);
  const recordDistance = parseInt(data[1]);
  let chargedTime = 0;
  let recordBreakingDistances = 0;

  for (let j = 0; j < time; j++) {
    const remainingTime = time - j;
    const distance = chargedTime * remainingTime;
    chargedTime++;
    if (distance > recordDistance) recordBreakingDistances++;
  }
  return recordBreakingDistances;
}
