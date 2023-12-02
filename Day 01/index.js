const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    data = data.split("\n");

    console.log(part1(data));
    console.log(part2(data));
  })

const part1 = data => {
  return data
    .map(line => line.split("").filter(char => parseInt(char)))
    .map(line => parseInt(line[0] + line[line.length - 1]))
    .reduce((acc, curr) => acc + curr, 0)
}

const part2 = data => {
  const stringDigitsArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const stringDigits = /one|two|three|four|five|six|seven|eight|nine/g;

  const firstLastDigits = data.map(line => {
    const matches = [];
    
    line.split("").forEach((char, i) => {
      // Iterate through each line, removing characters from the start of the string with each iteration
      const remainingLine = line.slice(i);
      let firstInt = parseInt(remainingLine[0]);

      // If the first char is an int already, add it to the matches array
      if (firstInt) {
        matches.push(firstInt.toString())
      } else {
        // If the first char is a string digit, add the int version to the matches array
        let firstDigit = remainingLine.match(stringDigits)?.[0];
        if (remainingLine.startsWith(firstDigit)) {
          const firstDigitStr = (stringDigitsArr.indexOf(firstDigit) + 1).toString();
          matches.push(firstDigitStr);
        }
      }
    })
    return parseInt(matches[0] + matches[matches.length - 1]);
  })
  return firstLastDigits.reduce((acc, curr) => acc + curr, 0);
}
