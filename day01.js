const puzzle = `3   4
3   7
7   9
6   3
15   2
14   14
2   2
9   1
23   5
1   4`;

const DELIMITER = '_';
const NANREGEX = /[^0-9]/g;

const puzzleAsArray = puzzle
    .replaceAll(NANREGEX, DELIMITER)
    .split(DELIMITER)
    .filter(x => x !== "")
    .map(Number);

const leftSide = puzzleAsArray.filter((x, i) => i % 2 === 0).toSorted();
const rightSide = puzzleAsArray.filter((x, i) => i % 2 !== 0).toSorted();

const puzzle1Result = leftSide.reduce((acc, lValue, i) => acc += Math.abs(lValue - rightSide[i]), 0);
const puzzle2Result = leftSide.reduce((acc, lValue) => acc += lValue * rightSide.filter(x => x === lValue).length, 0);

console.log(`Puzzle 1.1: ${puzzle1Result}`);
console.log(`Puzzle 1.2: ${puzzle2Result}`);