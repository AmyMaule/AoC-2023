const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    data = getMostCubesRevealed(data);
    console.log(part1(data));
    console.log(part2(data));
  })

const getMostCubesRevealed = (data) => {
  return data.split("\n").map(line => {
    const id = parseInt(line.split(":")[0].slice(4));
    const games = line.split(": ")[1].split(/; |, /);
    const mostCubes = { red: 0, green: 0, blue: 0 };

    games.forEach(game => {
      game = game.split(" ");
      const numCubes = parseInt(game[0]);
      const color = game[1];
      if (numCubes > mostCubes[color]) mostCubes[color] = numCubes;
    });
    return { id, mostCubes }
  })
}

// Valid: no more than 12 red cubes, 13 green cubes, 14 blue cubes
const part1 = data => {
  return data.reduce((acc, game) => {
    if (game.mostCubes.red <= 12 && game.mostCubes.green <= 13 && game.mostCubes.blue <= 14) {
      return acc + game.id;
    } else return acc;
  }, 0);
}

const part2 = data => {
  return data.reduce((acc, game) => {
    return acc + ((game.mostCubes.red || 1) * (game.mostCubes.green || 1) * (game.mostCubes.blue || 1))
  }, 0);
}
