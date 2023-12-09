const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    data = data.split("\n").map(row => row.split(" ").map(num => parseInt(num)));
    console.log(part1(data));
    console.log(part2(data));
  })

  const getNextNum = numArr => {
  // Get the difference between each number in numArr, use .filter to remove non-number values from the last comparison
  const differences = numArr
    .map((num, i) => numArr[i + 1] - num)
    .filter(difference => !isNaN(difference));
  return numArr[numArr.length - 1] + (differences.length && !differences.every(val => val === 0) ? getNextNum(differences) : 0);
}

const predictNumber = data => data.map(row => getNextNum(row)).reduce((acc, curr) => acc + curr, 0);

const part1 = data => predictNumber(data);

// Reverse data array to get previous number instead of next
const part2 = data => predictNumber(data.map(row => row.reverse()));
