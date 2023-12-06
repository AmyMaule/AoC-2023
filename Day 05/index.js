const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    const parsedMaps = data.split("\n\n").map(mapType => { 
      const type = mapType.split(":")[0];
      const rows = mapType.split(":")[1]
        .split("\n")
        .filter(str => str)
        .map(row => row.trim().split(" ").map(num => parseInt(num)));
      return ({ type, rows });
    });

    console.log(part1(parsedMaps));
  })

const part1 = parsedMaps => {
  const seeds = parsedMaps[0].rows;  
  let lowestLocationNumber;

  for (let i = 0; i < seeds[0].length; i++) {
    let currentSeed = seeds[0][i];
    
    // start j at 1 to skip seed array
    for (let j = 1; j < parsedMaps.length; j++) {
      // iterate over each range
      for (let k = 0; k < parsedMaps[j].rows.length; k++) {
        const row = parsedMaps[j].rows[k];
        if (currentSeed >= row[1] && row[1] + row[2] >= currentSeed) {
          // get difference between SOIL and SEED numbers (or equivalent for each map)
          currentSeed = currentSeed + row[0] - row[1];
          break;
        }
      }
      
      // Once the final range has been reached, determine if currentSeed is lower than the lowest location number
      if (j === parsedMaps.length - 1) {
        if (!lowestLocationNumber || lowestLocationNumber > currentSeed) {
          lowestLocationNumber = currentSeed;
        }
      }
    }
  }
  return lowestLocationNumber;
}
