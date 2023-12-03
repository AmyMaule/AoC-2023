const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    const rows = data.split("\n");

    console.log(part1(rows));
    console.log(part2(rows));
  })

const isTouchingSymbol = (rows, coords) => {
  const { x, y } = coords;
  const validSymbol = /^[^0-9a-zA-Z.]+$/; // Symbols are anything that is not alphanumeric or a full stop
  const surroundingSquares = [rows[x-1]?.[y-1], rows[x-1]?.[y], rows[x-1]?.[y+1], rows[x][y-1], rows[x][y+1], rows[x+1]?.[y-1], rows[x+1]?.[y], rows[x+1]?.[y+1]];

  for (let i = 0; i < surroundingSquares.length; i++) {
    if (validSymbol.test(surroundingSquares[i])) return true;
  }
  return false;
}

const part1 = rows => {
  let sumValidParts = 0;
    
  rows.forEach((row, i) => {
    // tempNum holds each individual number as a string until iterating over the number has finished
    let tempNum = "";
    let istempNumTouchingSymbol = false;
    row.split("").forEach((char, j) => {
      if (/[0-9]/.test(parseInt(char))) {
        tempNum += char;
        if (isTouchingSymbol(rows, { x: i, y: j })) istempNumTouchingSymbol = true;

        // if next char is not a number, the number has finished
        if (!/[0-9]/.test(parseInt(rows[i][j+1]))) {
          if (tempNum && istempNumTouchingSymbol) {
            sumValidParts += parseInt(tempNum);
          }
          tempNum = "";
          istempNumTouchingSymbol = false;
        }
      }
    })
  })
  return sumValidParts;
}

const adjacentNumbers = (rows, { x, y }) => {
  const surroundingSquares = [rows[x-1]?.[y-1], rows[x-1]?.[y], rows[x-1]?.[y+1], rows[x][y-1], rows[x][y+1], rows[x+1]?.[y-1], rows[x+1]?.[y], rows[x+1]?.[y+1]];

  let adjacentNumbers = new Set();
  // Iterate over the 8 squares surrounding the symbol
  surroundingSquares.forEach((currentNum, i) => {
    // If the symbol is directly adjacent to a number, check numbers either side of it and add the full number to adjacentNumbers
    if (/[0-9]/.test(parseInt(currentNum))) {
      // Get starting coordinates of the current number, but as the middle value (rows[x][y]) is missing, the positions look like this:
      // 0 1 2
      // 3   4
      // 5 6 7
      const currentX = i < 3 ? (x - 1) : i > 4 ? (x + 1) : x;
      const currentY = i === 0 || i === 3 || i === 5 ? (y - 1) : i === 1 || i === 6 ? y : (y + 1);

      // Check y+1 and y+2 to see if they are numbers
      if (/[0-9]/.test(parseInt(rows[currentX][currentY+1]))) {
        currentNum += rows[currentX][currentY+1];
        // Only check y+2 if y+1 was a number
        if (/[0-9]/.test(parseInt(rows[currentX][currentY+2]))) {
          currentNum += rows[currentX][currentY+2];
        }
      }
      // Check y-1 and y-2 to see if they are numbers
      if (/[0-9]/.test(parseInt(rows[currentX][currentY-1]))) {
        currentNum = rows[currentX][currentY-1] + currentNum;
        // Only check y-2 if y-1 was a number
        if (/[0-9]/.test(parseInt(rows[currentX][currentY-2]))) {
          currentNum = rows[currentX][currentY-2] + currentNum;
        }
      }
      adjacentNumbers.add(parseInt(currentNum));      
    }
  });
  if (adjacentNumbers.size === 2) {
    const values = [...adjacentNumbers.values()];
    return values[0] * values[1];
  }
  return 0;
}

const part2 = rows => {
  let sumValidParts = 0;
  rows.forEach((row, x) => {
    row.split("").forEach((char, y) => {
      if (char === "*") sumValidParts += adjacentNumbers(rows, { x, y });
    });
  })
  return sumValidParts;
}
