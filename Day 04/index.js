const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    data = data.split("\n").map(row => row.split(": ")[1].split(" | "));
    const cards = data.map(card => {
      const getNumbers = card => card.trim().split(/\s+/);
      const winningNumbers = getNumbers(card[0]);
      const ownedNumbers = getNumbers(card[1]);
      return [winningNumbers, ownedNumbers];
    });
    
    console.log(part1(cards));
    console.log(part2(cards));
  })

const getTotalWins = card => {
  let totalWinningNumbers = 0;
  card[0].forEach(num => {
    if (card[1].includes(num)) totalWinningNumbers++;
  });
  return totalWinningNumbers;
}

const part1 = cards => {
  let totalPoints = 0;
  cards.forEach(card => {
    const totalWinningNumbers = getTotalWins(card);
    // Use 2 to the power or the total winning numbers minus 1
    const currentPoints = Math.floor(Math.pow(2, totalWinningNumbers - 1));
    totalPoints += currentPoints;
  });
  return totalPoints;
}

const part2 = cards => {
  const cardsOwned = {};
  cards.forEach((card, i) => {
    const totalWinningNumbers = getTotalWins(card);

    // Add initial copy of current card to cardsOwned
    if (cardsOwned[i]) {
      cardsOwned[i]++;
    } else {
      cardsOwned[i] = 1;
    }
    
    // For each win on current card (cardsOwned[i]), create a copy of subsequent cards
    for (let j = 0; j < totalWinningNumbers; j++) {
      if (cardsOwned[i + j + 1]) {
        cardsOwned[i + j + 1] += cardsOwned[i];
      } else cardsOwned[i + j + 1] = cardsOwned[i];
    }
  });
  return Object.values(cardsOwned).reduce((acc, curr) => acc + curr, 0);
}
