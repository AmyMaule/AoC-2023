const inputText = "sample.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    const instructions = data.split("\n\n")[0].split("");
    const nodes = data = data.split("\n\n")[1].split("\n").map(row => row.split(/[^A-Z]/).filter(text => text));
    console.log(part1(instructions, nodes));
  })

const part1 = (instructions, nodes) => {
  instructions = instructions.map(instruction => instruction === "L" ? 1 : 2);
  let currentInstruction = 0;
  let totalSteps = 0;
  let currentNode = nodes.find(node => node[0] === "AAA");
  
  while (currentNode[0] !== "ZZZ") {
    totalSteps++;
    currentNode = nodes.find(node => node[0] === currentNode[(instructions[currentInstruction])]);
    currentInstruction = currentInstruction === instructions.length - 1 ? 0 : currentInstruction + 1;
  }
  return totalSteps;
}
