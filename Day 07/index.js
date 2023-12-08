const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    data = data.split("\n").map(row => row.split(" "));
    console.log(part1(getPlayData(data)));
    console.log(part2(getPlayData(data, true)));
  })

// Put data into more useable format
const getPlayData = (data, joker) => {
  const playData = {};
  data.forEach((row, i) => {
    playData[i] = {
      hand: row[0].split(""),
      bid: parseInt(row[1]),
      handType: joker 
        ? getHandType(row[0].split(""), true)
        : getHandType(row[0].split(""))
    }
  });
  return playData;
}

const getHandType = (hand, joker) => {
  const numberOfJokers = joker ? hand.filter(c => c === "J").length : 0;
  const countSameCards = card => hand.filter(c => c === card).length + numberOfJokers;
  const cards = new Set(joker ? hand.filter(c => c !== "J") : hand);
  let size = cards.size;
  
  if (joker && size !== 3 && size !== 2) {
    size - numberOfJokers < 0 ? 0 : size - numberOfJokers;
  }
  
  // handType: 6, 5, 4, 3, 2, 1, 0 from Five of a kind down to High card
  if (size === 5) { // High card
    return 0;
  } else if (size === 4) { // 1 pair
    return 1;
  } else if (size === 3) {
    if (countSameCards(hand[0]) === 3 || countSameCards(hand[1]) === 3 || countSameCards(hand[2]) === 3 || countSameCards(hand[3]) === 3) { // 3 of a kind
      return 3;
    }
    return 2; // 2 pairs
  } else if (size === 2) {
    if (countSameCards(hand[0]) === 4 || countSameCards(hand[1]) === 4 || countSameCards(hand[2]) === 4) { // 4 of a kind
      return 5;
    } else return 4; // Full house, 3 and 2    
  } else if (size === 1 || size === 0) {  // 5 of a kind (size would be 0 if all cards are jokers)
    return 6;
  }
}

const calculateWin = (playData, order) => {
  const sortedByWin = Object.values(playData).sort((a, b) => {
    if (a.handType === b.handType) {
      // Keep iterating until one card is greater than the other
      for (let i = 0; i < a.hand.length; i++) {
        if (order.indexOf(b.hand[i]) > order.indexOf(a.hand[i])) return -1;
        if (order.indexOf(b.hand[i]) < order.indexOf(a.hand[i])) return 1;
      }
    }
    return a.handType - b.handType;
  });
  return sortedByWin.map(hand => hand.bid).reduce((acc, curr, i) => acc + (curr * (i+1)), 0);
}

const part1 = playData => {
  const order = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  return calculateWin(playData, order);
}

const part2 = playData => {
  const order = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
  return calculateWin(playData, order);
}
